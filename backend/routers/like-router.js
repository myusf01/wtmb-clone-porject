const express = require('express')
const router = new express.Router()
const LikeService = require('../services/like-service')
const UserService = require('../services/user-service')
const TweetService = require('../services/tweet-service')

// Get all likes o a tweet.
router.get('/:tweetID/all', async (req, res) => {
  const likedTweetId = req.params.tweetID
  const theTweet = await TweetService.findItem(likedTweetId)
  const likes = theTweet.likes

  res.send(likes)
})

// Get a like rendered
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const like = await LikeService.findItem(id)
  if (!like) res.status(404)

  // console.log(like);
  if (like) res.render('like', { like })
})

// Get a like JSON
router.get('/:id/json', async (req, res) => {
  const id = req.params.id
  const like = await LikeService.findItem(id)
  res.send(like)
})
// Create Like
router.post('/:tweetID', async (req, res) => {
  const userID = req.body.userID

  const tweetID = req.params.tweetID

  const user = await UserService.findItem(userID)

  const tweet = await TweetService.findItem(tweetID)

  const like = await LikeService.add({ user: user, tweet: tweet })

  await LikeService.createLike(user, tweet, like)

  res.send(like)
})

module.exports = router
