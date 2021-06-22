const BaseService = require('./base-service')
const RetweetModel = require('../models/retweet')

class RetweetService extends BaseService {
  model = RetweetModel

  async retweet(user, tweet, retweet) {
    if (
      (await retweet.checkRetweet(retweet)) &
      (await tweet.checkIfRetweetExists(user))
    ) {
      console.log("You've already retweeted!!!")
      return false
    } else {
      user.retweets.push(retweet)
      await user.save()
      tweet.retweetedUsers.push(user)
      await tweet.save()

      return true
    }
  }

  async undoRetweet(user, retweet) {
    const tweet = retweet.tweet
    if (
      (await retweet.checkRetweet(retweet)) &
      (await tweet.checkIfRetweetExists(user))
    ) {
      //Undo retweet

      await user.findInRetweetsAndDelete(retweet._id, user._id)

      await tweet.findInRetweetsAndDelete(user._id, tweet._id)

      await user.save()
      await tweet.save()
      return true
    }
  }
}

module.exports = new RetweetService()
