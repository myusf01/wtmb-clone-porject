import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Unlike tweet.', async t => {
  // Dummy user data
  const user1Data = {
    name: 'Ben 1 Num.',
    username: 'bn1num'
  }
  const newTweet1 = {
    tweet: 'Testing tweet of User 1 has been sent. To like.'
  }
  const user2Data = {
    name: 'Ben 2 Num.',
    username: 'bn2num'
  }
  const user3Data = {
    name: 'Ben 3 Num.',
    username: 'bn3num'
  }
  // Create User 1
  const user1 = await request(app)
    .post('/user')
    .send(user1Data)

  t.is(user1.status, 200)

  // Create User 2
  const user2 = await request(app)
    .post('/user')
    .send(user2Data)
  t.is(user2.status, 200)
  // Create User 3
  const user3 = await request(app)
    .post('/user')
    .send(user3Data)
  t.is(user3.status, 200)

  // User 1 sends a tweet.
  const user1Tweet = await request(app)
    .post(`/tweet/${user1.body._id}`)
    .send(newTweet1)
  t.is(user1Tweet.status, 200)

  // User 2 Likes User 1's tweet.
  const like1 = await request(app)
    .post(`/like/${user1Tweet.body._id}`)
    .send({
      userID: user2.body._id
    })

  t.is(like1.status, 200)
  t.is(like1.ok, true)

  // User 3 Likes User 1's tweet.
  const like2 = await request(app)
    .post(`/like/${user1Tweet.body._id}`)
    .send({
      userID: user3.body._id
    })

  t.is(like2.status, 200)
  t.is(like2.ok, true)

  // Fetch latest version of tweet to check after unlike

  const fetchedTweetOld = (
    await request(app).get(`/tweet/${user1Tweet.body._id}/json`)
  ).body

  // User 2 Unlikes tweet1

  const unlikeTweet1 = await request(app).post(`/unlike/${like1.body._id}`)

  t.is(unlikeTweet1.status, 200)
  t.is(unlikeTweet1.ok, true)

  // const getRemovedLike = await request(app)
  //     .get(`/like/${like1.body._id}`)
  // t.is(getRemovedLike.status,404)
  const fetchedTweetNew = unlikeTweet1.body
  t.true(fetchedTweetOld.likes.length > fetchedTweetNew.likes.length)
  t.notDeepEqual(fetchedTweetOld, fetchedTweetNew)
})
