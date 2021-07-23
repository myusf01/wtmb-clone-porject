import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';
import userInfo from './modules/userInfo'

Vue.use(Vuex)
const userState = createPersistedState({
  key:'user',
  paths:['userInfo.user']
})

export default new Vuex.Store({
  state: {
    counter: 0,
    tweets: [],
    tweet2send: ''
  },
  plugins: [userState],
  mutations: {
    SET_TWEETS(state, data) {
      state.tweets = data
    },
    POST_TWEET(state, data) {
      state.tweet2send = data
    },

  },
  actions: {
    async fetchTweets({ commit }) {
      const result = await axios.get(
        `${process.env.VUE_APP_API_URL}/tweet/all/json`
      )
      commit('SET_TWEETS', result.data.reverse())
    },

    async sendTweet({ commit }, data) {
      console.log('boook')
      console.log(data.user)
      await axios.post(
        `${process.env.VUE_APP_API_URL}/tweet/${this.state.userInfo.user._id}`,
        {
          tweet: data.tweetText
        }
      )

      commit('POST_TWEET', data.tweetText)
    }
  },
  modules: {userInfo}
})
