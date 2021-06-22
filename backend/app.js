const express = require('express')
const bodyParser = require('body-parser')

const UserService = require('./services/user-service')
const TweetService = require('./services/tweet-service')
const cors = require('cors')

const userRouter = require('./routers/user-router')
const tweetRouter = require('./routers/tweet-router')
const retweetRouter = require('./routers/retweet-router')
const likeRouter = require('./routers/like-router')
const unlikeRouter = require('./routers/unlike-router')
const followRouter = require('./routers/follow-router')
const unfollowRouter = require('./routers/unfollow-router')

require('./mongo-connection')

const app = express()
app.set('view engine', 'pug')

app.use(cors())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/tweet', tweetRouter)
app.use('/retweet', retweetRouter)
app.use('/like', likeRouter)
app.use('/unlike', unlikeRouter)
app.use('/follow', followRouter)
app.use('/unfollow', unfollowRouter)

// GET

app.get('/', async (req, res) => {
  const tweets = await TweetService.findAll()
  const users = await UserService.findAll()
  // console.log(tweets);

  res.render('index', {
    tweets,
    users
  })
})

module.exports = app
// export default app
