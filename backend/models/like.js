const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1
    }
  },
  tweet: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Tweet',
    autopopulate: {
      maxDepth: 1
    }
  }
})

LikeSchema.plugin(require('mongoose-autopopulate'))
const LikeModel = mongoose.model('Like', LikeSchema)
module.exports = LikeModel
