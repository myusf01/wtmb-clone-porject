const express = require('express')
const router = new express.Router()
const UserService = require('../services/user-service')

router.post('/:id', async (req, res) => {
  const followerID = req.params.id
  const followingID = req.body.id

  let follower = await UserService.findItem(followerID)
  let following = await UserService.findItem(followingID)

  const followAction = await UserService.followUser(follower, following)

  // follower = await UserService.findItem(followerID)
  // 471=> Expectation Failed Error Code
  if (!followAction) res.status(417)

  res.send(following)
})

router.get('/getFollower/:id', async (req, res) => {
  const userID = req.params.id
  const followerID = req.body.id

  const theUser = await UserService.findItem(userID)
  const theFollower = await UserService.findItem(followerID)

  const checkFollower = await theUser.checkIfFollowing(followerID)
  if (!checkFollower) res.status(404)
  res.send(theFollower)
})

router.get('/getFollowing/:id', async (req, res) => {
  const userID = req.params.id
  const followingID = req.body.id

  const theUser = await UserService.findItem(userID)
  const theFollowing = await UserService.findItem(followingID)

  const checkFollowing = await theUser.checkIfUserFollows(followingID)

  if (!checkFollowing) res.status(404)

  res.send(theFollowing)
})

module.exports = router
