const mongoose = require('mongoose')

const RetweetSchema = new mongoose.Schema({
  tweet: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Tweet',
    autopopulate: {
      maxDepth: 1
    }
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1
    }
  }
})

RetweetSchema.plugin(require('mongoose-autopopulate'))

RetweetSchema.methods.checkRetweet = async function(retweet) {
  const isExists = await RetweetModel.exists({
    tweet: retweet.tweet,
    user: retweet.user
  })

  if (isExists) {
    return true
  }
}

const RetweetModel = mongoose.model('Retweet', RetweetSchema)

module.exports = RetweetModel
