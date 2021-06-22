const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
  text: String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1
    }
  },
  likes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Like',
      autopopulate: {
        maxDepth: 1
      }
    }
  ],
  retweetedUsers: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1
      }
    }
  ]
})

TweetSchema.plugin(require('mongoose-autopopulate'))

// find by tweet id and delete the like in likes array.
TweetSchema.methods.findInTweetLikesAndDelete = async function(
  tweetID,
  likeID
) {
  return await TweetModel.findByIdAndUpdate(tweetID, {
    $pull: { likes: likeID }
  })
}

TweetSchema.methods.checkIfRetweetExists = async function(user) {
  const isExists = await TweetModel.exists({ retweetedUsers: user })
  if (isExists) {
    return true
  }

  return false
}

TweetSchema.methods.findInRetweetsAndDelete = async function(user, tweet) {
  return await TweetModel.findByIdAndUpdate(tweet, {
    $pull: {
      retweetedUsers: user
    }
  })
}

const TweetModel = mongoose.model('Tweet', TweetSchema)

module.exports = TweetModel
