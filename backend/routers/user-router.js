const express = require('express')
const router = new express.Router()
const UserService = require('../services/user-service')
const TweetService = require('../services/tweet-service')

// DON'T FORGET TO USE CORRECT ORDER
// OR THE APP WILL CRASH!!!

router.get('/all', async (req, res) => {
  const users = await UserService.findAll()
  res.render('users', {
    users
  })
})

router.get('/all/json', async (req, res) => {
  const users = await UserService.findAll()
  res.send(users)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await UserService.findItem(id)
  if (!user) res.status(404)

  const userTweets = await TweetService.findItem(id)

  await res.render('user', {
    user,
    userTweets
  })
})

router.get('/:id/json', async (req, res) => {
  const id = req.params.id
  const user = await UserService.findItem(id)

  if (!user) res.status(404)

  await res.send(user)
})

// get a user's all tweets
router.get('/:id/tweets', async (req, res) => {
  const id = req.params.id
  const userTweets = await TweetService.findItem(id)
  if (!userTweets) res.status(404)

  await res.send(userTweets)
})


// Create new user
router.post('/', async (req, res) => {
  const newUser = await UserService.add({
    username: req.body.username,
    name: req.body.name
  })
  res.send(newUser)
})

// Delete user
router.delete('/:id', async (req, res) => {
  const userID = req.params.id
  const deletedUser = await UserService.del(userID)
  res.send(deletedUser)
})

module.exports = router
