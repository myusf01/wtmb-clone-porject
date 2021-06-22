import test from 'ava'
import request from 'supertest'
import app from '../app'

// A user can tweet.
test('User can tweet.', async t => {
  // create user
  const newUser = {
    username: 'tuser1',
    name: 'Tweeted User1'
  }
  // create tweet
  const newTweet = {
    tweet: 'Testing tweet has been sent.'
  }

  // post user
  const createdUser = await request(app)
    .post('/user')
    .send(newUser)

  t.is(createdUser.status, 200)

  // post tweet
  const sendTweet = await request(app)
    .post(`/tweet/${createdUser.body._id}`)
    .send(newTweet)

  t.is(sendTweet.status, 200)
  t.is(sendTweet.ok, true)

  t.is(sendTweet.body.text, newTweet.tweet)
  // get the user from database
  const fetchNewUser = await request(app).get(
    `/user/${createdUser.body._id}/json`
  )
  t.is(fetchNewUser.status, 200)

  // check if user has tweets is in users tweets array.
  t.is(fetchNewUser.body.tweets[0]._id, sendTweet.body._id)

  //fetch the tweet.
  const fetchTweet = await request(app).get(`/tweet/${sendTweet.body._id}`)

  t.is(fetchTweet.status, 200)

  // check if test tweet is in users tweets.
  // is not working due to autopopulation of user.
  // console.log(sendTweet.body.user);
  // console.log(fetchNewUser.body.tweets[0]);
  // t.deepEqual(fetchNewUser.body.tweets[0],sendTweet.body)
})

// Delete a tweet.
test('A user can delete tweet', async t => {
  t.plan(6)
  // create user
  const newUser = {
    username: 'tuser1',
    name: 'Tweeted User1'
  }
  // create tweet
  const newTweet = {
    tweet: 'Testing tweet has been sent to be deleted.'
  }

  // post user
  const createdUser = await request(app)
    .post('/user')
    .send(newUser)

  t.is(createdUser.status, 200)

  // post tweet
  const sendTweet = await request(app)
    .post(`/tweet/${createdUser.body._id}`)
    .send(newTweet)

  t.is(sendTweet.status, 200)

  // delete the created tweet.
  const deleteTweet = await request(app).delete(`/tweet/${sendTweet.body._id}`)

  t.is(deleteTweet.status, 200)
  t.is(deleteTweet.ok, true)

  const fetchTweet = await request(app).get(`/tweet/${sendTweet.body._id}`)
  t.is(fetchTweet.status, 404)

  const fetchTweetJson = await request(app).get(
    `/tweet/${sendTweet.body._id}/json`
  )
  t.is(fetchTweetJson.status, 404)
})

test('Get a list of all tweets.', async t => {
  t.plan(4)

  // get rendered tweets view
  const getTweetsRendered = await request(app).get('/tweet/all')
  t.is(getTweetsRendered.status, 200)
  // get json tweets
  const getTweetsJson = await request(app).get('/tweet/all/json')
  t.is(getTweetsJson.status, 200)

  // get tweet json body and check
  t.true(Array.isArray(getTweetsJson.body), 'Body should be an array!!')
  t.true(getTweetsJson.body.length > 0)
})
