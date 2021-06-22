const BaseService = require('./base-service')
const LikeModel = require('../models/like')

class LikeService extends BaseService {
  model = LikeModel

  async createLike(user, tweet, like) {
    user.userLikes.push(tweet)
    tweet.likes.push(like)

    await user.save()
    await tweet.save()
  }

  async dislikeTweet(user, tweet, like) {
    const likeID = like._id
    const userID = user._id
    const tweetID = tweet._id

    await user.findInUserLikesAndDelete(userID, tweetID)
    await tweet.findInTweetLikesAndDelete(tweetID, likeID)
  }
}

module.exports = new LikeService()
