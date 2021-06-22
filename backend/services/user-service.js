const BaseService = require('./base-service')
const UserModel = require('../models/user')

class UserService extends BaseService {
  model = UserModel

  async followUser(follower, following) {
    if (
      (await follower.checkIfUserFollows(following)) &
      (await following.checkIfFollowing(follower))
    ) {
      console.error(follower.name, ' already following user!!', following.name)
      return false
    } else {
      following.followers.push(follower)
      follower.followings.push(following)
    }

    await follower.save()
    await following.save()
    return true
  }

  async unfollowUser(follower, following) {
    if (
      (await follower.checkIfUserFollows(following)) &
      (await following.checkIfFollowing(follower))
    ) {
      await following.findInFollowersAndDelete(following, follower)
      await follower.findInFollowingsAndDelete(follower, following)

      return true
    } else {
      console.log("You're not following this user already.")
      return false
    }
  }
}

module.exports = new UserService()
