const express = require('express')
const router = new express.Router()
const TweetService = require('../services/tweet-service')
const UserService = require('../services/user-service')

router.get('/all', async (req, res) => {
  const allTweets = await TweetService.findAll()
  res.render('alltweets', {
    tweets: allTweets
  })
})

router.get('/all/json', async (req, res) => {
  const allTweets = await TweetService.findAll()
  res.send(allTweets)
})

// Get a tweet
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const tweet = await TweetService.findItem(id)
  if (!tweet) res.status(404)
  res.render('tweet', {
    tweet: tweet
  })
})

//g Get tweet Json
router.get('/:id/json', async (req, res) => {
  const id = req.params.id
  const tweet = await TweetService.findItem(id)
  if (!tweet) res.status(404)

  res.send(tweet)
})

// Create tweet
router.post('/:id', async (req, res) => {
  const user = await UserService.findItem(req.params.id)
  const tweet = req.body.tweet

  const createdTweet = await TweetService.addTweet(user, tweet)
  // console.log(createdTweet);
  res.send(createdTweet)
})

// Delete tweet
router.delete('/:id', async (req, res) => {
  const tweetid = req.params.id
  const findTweet = await TweetService.findItem(tweetid)
  if (!findTweet) res.status(404)

  const deletedTweet = await TweetService.del(tweetid)
  res.send(deletedTweet)
})

module.exports = router