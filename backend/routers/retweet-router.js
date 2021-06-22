const express = require('express')
const router = new express.Router()

const UserService = require('../services/user-service')
const TweetService = require('../services/tweet-service')
const RetweetService = require('../services/retweet-service')

router.post('/:tweetID', async (req, res) => {
  const tweetID = req.params.tweetID
  const userID = req.body.userID

  const user = await UserService.findItem(userID)
  const tweet = await TweetService.findItem(tweetID)

  const retweet = await RetweetService.add({ tweet: tweet, user: user })

  const retweetAction = await RetweetService.retweet(user, tweet, retweet)

  if (!retweetAction) res.status(404)
  res.send(retweet)
})

router.post('/undo/:retweetID', async (req, res) => {
  const retweetID = req.params.retweetID
  const retweet = await RetweetService.findItem(retweetID)

  const user = await UserService.findItem(retweet.user._id)

  const undo = await RetweetService.undoRetweet(user, retweet)
  if (!undo) res.status(404)
  res.send(retweet.tweet)
})

module.exports = router
