import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Retweet a tweet', async t => {
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

  // Create User 1
  const user1 = await request(app)
    .post('/user')
    .send(user1Data)

  t.is(user1.status, 200)

  // User 1 sends a tweet.
  const tweet1 = await request(app)
    .post(`/tweet/${user1.body._id}`)
    .send(newTweet1)
  t.is(tweet1.status, 200)

  // Create User 2
  const user2 = await request(app)
    .post('/user')
    .send(user2Data)
  t.is(user2.status, 200)

  // User 2 Retweets tweet1

  const retweet1 = await request(app)
    .post(`/retweet/${tweet1.body._id}`)
    .send({ userID: user2.body._id })

  t.is(retweet1.status, 200)

  const updatedTweet1 = await request(app).get(`/tweet/${tweet1.body._id}/json`)
  const updatedUser2 = await request(app).get(`/user/${user2.body._id}/json`)

  t.is(
    tweet1.body.retweetedUsers.length <
      updatedTweet1.body.retweetedUsers.length,
    true
  )
  t.is(user2.body.retweets.length < updatedUser2.body.retweets.length, true)
})

test('Undo a retweet.', async t => {
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

  // Create User 1
  const user1 = await request(app)
    .post('/user')
    .send(user1Data)

  t.is(user1.status, 200)

  // User 1 sends a tweet.
  const tweet1 = await request(app)
    .post(`/tweet/${user1.body._id}`)
    .send(newTweet1)
  t.is(tweet1.status, 200)

  // Create User 2
  const user2 = await request(app)
    .post('/user')
    .send(user2Data)
  t.is(user2.status, 200)

  // User 2 Retweets tweet1

  const retweet1 = await request(app)
    .post(`/retweet/${tweet1.body._id}`)
    .send({ userID: user2.body._id })

  t.is(retweet1.status, 200)

  const updatedTweet1v1 = (
    await request(app).get(`/tweet/${tweet1.body._id}/json`)
  ).body
  const updatedUser2v1 = (
    await request(app).get(`/user/${user2.body._id}/json`)
  ).body

  console.log(retweet1.body._id)
  const undoRetweet = await request(app).post(
    `/retweet/undo/${retweet1.body._id}`
  )

  t.is(undoRetweet.status, 200)

  const updatedTweet1v2 = (
    await request(app).get(`/tweet/${tweet1.body._id}/json`)
  ).body
  const updatedUser2v2 = (
    await request(app).get(`/user/${user2.body._id}/json`)
  ).body

  t.notDeepEqual(updatedTweet1v1.retweetedUsers, updatedTweet1v2.retweetedUsers)
  t.notDeepEqual(updatedUser2v1.retweets[0], updatedUser2v2.retweets[0])
})

test('Retweet a retweeted tweet', async t => {
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

  // Create User 1
  const user1 = await request(app)
    .post('/user')
    .send(user1Data)

  t.is(user1.status, 200)

  // User 1 sends a tweet.
  const tweet1 = await request(app)
    .post(`/tweet/${user1.body._id}`)
    .send(newTweet1)
  t.is(tweet1.status, 200)

  // Create User 2
  const user2 = await request(app)
    .post('/user')
    .send(user2Data)
  t.is(user2.status, 200)

  // User 2 Retweets tweet1

  const retweet1 = await request(app)
    .post(`/retweet/${tweet1.body._id}`)
    .send({ userID: user2.body._id })

  t.is(retweet1.status, 200)

  // update data after retweet
  const updatedTweet1 = (
    await request(app).get(`/tweet/${tweet1.body._id}/json`)
  ).body
  const updatedUser2 = (await request(app).get(`/user/${user2.body._id}/json`))
    .body
  const updatedUser1 = (await request(app).get(`/user/${user1.body._id}/json`))
    .body

  // User 2 attempts to retweet again!
  const retweet2 = await request(app)
    .post(`/retweet/${tweet1.body._id}`)
    .send({ userID: user2.body._id })

  t.is(retweet2.status, 404)

  // update data after retweet again
  const updatedTweet1v2 = (
    await request(app).get(`/tweet/${tweet1.body._id}/json`)
  ).body
  const updatedUser2v2 = (
    await request(app).get(`/user/${user2.body._id}/json`)
  ).body
  const updatedUser1v2 = (
    await request(app).get(`/user/${user1.body._id}/json`)
  ).body

  t.deepEqual(updatedUser1.retweets, updatedUser1v2.retweets)
  t.deepEqual(updatedTweet1v2.retweetedUsers, updatedTweet1.retweetedUsers)
})
