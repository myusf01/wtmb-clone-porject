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
      const result = await axios.get(`${process.env.VUE_APP_API_URL}/tweet/all/json`)
      commit('SET_TWEETS', result.data.reverse())
    },

    async sendTweet({ commit }, data) {
      console.log("boook");
      console.log(data.user);
      await axios
        .post(
          `${process.env.VUE_APP_API_URL}/tweet/${this.state.user._id}`,
          {
            tweet: data.tweetText
          }
        )
        
      commit('POST_TWEET', data.tweetText)
    },

     async createUser({commit}) {
      const randomUser = await (await axios.get('https://randomuser.me/api/?nat=tr&inc=name')).data.results[0].name
      const name = randomUser.first + " "+ randomUser.last
      const username = randomUser.last+randomUser.first.toUpperCase()
      const createUser = await axios.post(`${process.env.VUE_APP_API_URL}/user/`,{name:name,username:username})

      commit('POST_USER',createUser.data)
      

    }
  },
  modules: {}
})
