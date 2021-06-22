import test from 'ava'
import request from 'supertest'
import app from '../app'

// Unfollow when already following a user.
test(' Unfollow when already following a user.', async t => {
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

  // Create User 2
  const user2 = await request(app)
    .post('/user')
    .send(userData.user2Data)

  // Create User 3
  const user3 = await request(app)
    .post('/user')
    .send(userData.user3Data)

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

  // User 2 Unfollows User 3
  const unfollowUser2 = await request(app)
    .post(`/unfollow/${user1.body._id}`)
    .send({ id: user2.body._id })

  t.is(unfollowUser2.status, 200)
  t.is(unfollowUser2.ok, true)

  const updatedUser1 = (await request(app).get(`/user/${user1.body._id}/json`))
    .body

  const updatedUser2 = (await request(app).get(`/user/${user2.body._id}/json`))
    .body

  const getFollower1 = await request(app)
    .get(`/follow/getFollower/${updatedUser1._id}`)
    .send({
      id: updatedUser2._id
    })
  t.is(getFollower1.status, 404)
  const getFollowing1 = await request(app)
    .get(`/follow/getFollowing/${updatedUser1._id}`)
    .send({
      id: updatedUser2._id
    })

  t.is(getFollowing1.status, 404)

  t.true(followUser2.body.followers > getFollower1.body.followers)
})

// Can't unfollow if you aren't following a user.

test("Can't unfollow if you aren't following a user.", async t => {
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

  // Create User 2
  const user2 = await request(app)
    .post('/user')
    .send(userData.user2Data)

  // Create User 3
  const user3 = await request(app)
    .post('/user')
    .send(userData.user3Data)

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

  // User 2 Unfollows User 1
  const unfollowUser2 = await request(app)
    .post(`/unfollow/${user1.body._id}`)
    .send({ id: user2.body._id })

  t.is(unfollowUser2.status, 200)
  t.is(unfollowUser2.ok, true)

  const updatedUser1 = (await request(app).get(`/user/${user1.body._id}/json`))
    .body

  const updatedUser2 = (await request(app).get(`/user/${user2.body._id}/json`))
    .body

  const getFollower1 = await request(app)
    .get(`/follow/getFollower/${updatedUser1._id}`)
    .send({
      id: updatedUser2._id
    })
  t.is(getFollower1.status, 404)
  const getFollowing1 = await request(app)
    .get(`/follow/getFollowing/${updatedUser1._id}`)
    .send({
      id: updatedUser2._id
    })

  t.is(getFollowing1.status, 404)

  t.true(followUser2.body.followers > getFollower1.body.followers)

  // User 2 tries to unfollow User 1 again.

  const unfollowUser2v2 = await request(app)
    .post(`/unfollow/${user1.body._id}`)
    .send({ id: user2.body._id })

  t.is(unfollowUser2v2.status, 404)
})
