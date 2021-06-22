//deprecated for now. will work on it.

const BaseService = require('./base-service')
const FollowModel = require('../models/Follow')

class FollowService extends BaseService {
  model = FollowModel

  async followUser(follower, following) {}
}

module.exports = new FollowService()
