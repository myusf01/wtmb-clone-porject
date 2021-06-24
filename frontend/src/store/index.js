import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    tweets: [],
    tweet2send: '',
    user:{}
  },
  mutations: {
    SET_TWEETS(state, data) {
      state.tweets = data
    },
    POST_TWEET(state, data) {
      state.tweet2send = data
    },
    POST_USER(state,data){
      state.user = data
    }
  },
  actions: {
    async fetchTweets({ commit }) {
      const result = await axios.get('http://localhost:3000/tweet/all/json')
      commit('SET_TWEETS', result.data.reverse())
    },

    async sendTweet({ commit }, tweet) {
      await axios
        .post(
          `${process.env.VUE_APP_API_URL}/tweet/60c1c48763262f1f1c7d8c6e` ||
            `http://localhost:3000/tweet/60c1c48763262f1f1c7d8c6e`,
          {
            tweet: tweet.tweetText
          }
        )
        .then(this.fetchTweets())
      commit('POST_TWEET', tweet.tweetText)
    },

    createUser(getInfo,{commit}) {
      const userInfo = getInfo
      console.log("getinfo:",userInfo);

      commit('POST_USER', userInfo.name)

    }
  },
  modules: {}
})
