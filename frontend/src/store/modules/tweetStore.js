import axios from 'axios'

const state = {
  tweets: [],
  newTweet: ''
}
const getters = {
  tweets: state => state.tweets
}
const actions = {
  async fetchTweets({ commit }) {
    const result = await axios.get(
      `${process.env.VUE_APP_API_URL}/tweet/all/json`
    )
    commit('SET_TWEETS', result.data.reverse())
  },

  async sendTweet({ commit }, data) {
    console.log(data)
    const userID = this.state.userInfo.user._id

    await axios.post(`${process.env.VUE_APP_API_URL}/tweet/${userID}`, {
      tweet: data
    })

    commit('POST_TWEET', data)
  },
  async fetchUser({ commit },id) {
    const userID = id
    console.log(id);
    const result = await axios.get(
      `${process.env.VUE_APP_API_URL}/user/${userID}/json`
    )
    
    commit('SET_TWEETS', result.data.tweets.reverse())

  }
}
const mutations = {
  SET_TWEETS: (state, data) => {
    state.tweets = data
  },
  SET_USER: (state, data) => {
    state.theUser = data
  },
  POST_TWEET: (state, data) => {
    state.newTweet = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
