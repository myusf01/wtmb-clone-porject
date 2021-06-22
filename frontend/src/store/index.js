import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    tweets: [],
    tweet2send: ''
  },
  mutations: {
    SET_COUNTER(state, newCount) {
      state.counter = newCount
    },
    SET_TWEETS(state, data) {
      state.tweets = data
    },
    POST_TWEET(state, data) {
      state.tweet2send = data
    }
  },
  actions: {
    incrementCounter({ commit, state }) {
      const newCount = state.counter + 1
      commit('SET_COUNTER', newCount)
    },
    async fetchTweets({ commit }) {
      const result = await axios.get(`${process.env.VUE_APP_API_URL}/tweet/all/json`)
      commit('SET_TWEETS', result.data.reverse())
    },

    async sendTweet({ commit }, tweet) {
      await axios.post(`${process.env.VUE_APP_API_URL}/tweet/60c1c48763262f1f1c7d8c6e`, {
        tweet: tweet.tweetText
      })
      .then(this.fetchTweets())
      commit('POST_TWEET', tweet.tweetText)
    }
  },
  modules: {}
})
