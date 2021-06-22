const express = require('express')
const router = new express.Router()
const UserService = require('../services/user-service')

router.post('/:id', async (req, res) => {
  const followerID = req.body.id
  const followingID = req.params.id

  const follower = await UserService.findItem(followerID)
  const following = await UserService.findItem(followingID)

  const unfollowAct = await UserService.unfollowUser(follower, following)
  if (!unfollowAct) {
    res.status(404)
  }
  res.send(following)
})

module.exports = router
