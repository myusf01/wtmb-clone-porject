const express = require('express')
const router = new express.Router()

const LikeService = require('../services/like-service')
const UserService = require('../services/user-service')
const TweetService = require('../services/tweet-service')

router.post('/:likeID', async (req, res) => {
  const likeID = req.params.likeID

  const like = await LikeService.findItem(likeID)
  const userID = like.user._id
  const tweetID = like.tweet._id

  //TODO:
  // Figure out how to achieve functions below in
  // single line.

  const user = await UserService.findItem(userID)
  let tweet = await TweetService.findItem(tweetID)

  await LikeService.dislikeTweet(user, tweet, like)
  await LikeService.del(likeID)

  tweet = await TweetService.findItem(tweetID)
  res.send(tweet)
})

module.exports = router
