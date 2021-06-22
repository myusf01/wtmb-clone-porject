import test from 'ava'
import request from 'supertest'
import app from '../app'

// A User Can Follow √
// A User Can Follow if already followed √

// Get All Followers

// Get All Followings

// Get Specific Follower/Following

test('Unfollowed Users Can Follow', async t => {
  const userData = {
    user1Data: {
      name: 'Ben 1 Num.',
      username: 'bn1num'
    },
    user2Data: {
      name: 'Ben 2 Num.',
      username: 'bn2num'
    },
    user3Data: {
      name: 'Ben 3 Num.',
      username: 'bn3num'
    }
  }

  // Create Users
  const user1 = await request(app)
    .post('/user')
    .send(userData.user1Data)

  t.is(user1.status, 200)
  // Create User 2
  const user2 = await request(app)
    .post('/user')
    .send(userData.user2Data)

  t.is(user1.status, 200)
  // Create User 3
  const user3 = await request(app)
    .post('/user')
    .send(userData.user3Data)
  t.is(user3.status, 200)

  // User 1 - Following
  // User 2 - Follower
  // User 3 - Follower

  // User 2 Follows
  const followUser1 = await request(app)
    .post(`/follow/${user2.body._id}`)
    .send({
      id: user1.body._id
    })

  t.is(followUser1.status, 200)
  t.is(followUser1.ok, true)

  // User 3 Follows
  const followUser2 = await request(app)
    .post(`/follow/${user3.body._id}`)
    .send({
      id: user1.body._id
    })
  t.is(followUser2.status, 200)
  t.is(followUser2.ok, true)

  // Check if followers are increased
  t.true(followUser2.body.followers > user1.body.followers)

  // Fetch Updated Users
  const updatedUser1 = (await request(app).get(`/user/${user1.body._id}/json`))
    .body

  const updatedUser2 = (await request(app).get(`/user/${user2.body._id}/json`))
    .body

  const updatedUser3 = (await request(app).get(`/user/${user3.body._id}/json`))
    .body

  // Check if User 2 is in follwers list of User 1
  const getFollower1 = (
    await request(app)
      .get(`/follow/getFollower/${user1.body._id}`)
      .send({
        id: user2.body._id
      })
  ).body

  t.deepEqual(updatedUser2, getFollower1)

  // Check if User 3 is in follwers list of User 1
  const getFollower2 = (
    await request(app)
      .get(`/follow/getFollower/${user1.body._id}`)
      .send({
        id: user3.body._id
      })
  ).body

  t.deepEqual(updatedUser3, getFollower2)

  // Check if User 1 is on followings list of User 2
  const getFollowing1 = (
    await request(app)
      .get(`/follow/getFollowing/${updatedUser2._id}`)
      .send({
        id: updatedUser1._id
      })
  ).body

  t.deepEqual(updatedUser1, getFollowing1)

  // Check if User 1 is on followings list of User 3
  const getFollowing2 = (
    await request(app)
      .get(`/follow/getFollowing/${updatedUser3._id}`)
      .send({
        id: updatedUser1._id
      })
  ).body

  t.deepEqual(updatedUser1, getFollowing2)
})

test("Followed Users Can't Follow", async t => {
  const userData = {
    user1Data: {
      name: 'Ben 1 Num.',
      username: 'bn1num'
    },
    user2Data: {
      name: 'Ben 2 Num.',
      username: 'bn2num'
    },
    user3Data: {
      name: 'Ben 3 Num.',
      username: 'bn3num'
    }
  }

  // Create User 1
  const user1 = await request(app)
    .post('/user')
    .send(userData.user1Data)

  t.is(user1.status, 200)
  // Create User 2
  const user2 = await request(app)
    .post('/user')
    .send(userData.user2Data)

  t.is(user1.status, 200)
  // Create User 3
  const user3 = await request(app)
    .post('/user')
    .send(userData.user3Data)
  t.is(user3.status, 200)

  // User 1 - Following
  // User 2 - Follower
  // User 3 - Follower

  // User 2 Follows
  const followUser1 = await request(app)
    .post(`/follow/${user2.body._id}`)
    .send({
      id: user1.body._id
    })

  t.is(followUser1.status, 200)
  t.is(followUser1.ok, true)

  // User 3 Follows
  const followUser2 = await request(app)
    .post(`/follow/${user3.body._id}`)
    .send({
      id: user1.body._id
    })
  t.is(followUser2.status, 200)
  t.is(followUser2.ok, true)

  // User 2 Wants to follow again!
  const followUser3 = await request(app)
    .post(`/follow/${user2.body._id}`)
    .send({
      id: user1.body._id
    })

  // 471=> Expectation Failed Error Code
  t.is(followUser3.status, 417)
  t.is(followUser3.ok, false)
})
