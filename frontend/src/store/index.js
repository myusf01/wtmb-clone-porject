import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import userInfo from './modules/userInfo'
import tweetStore from './modules/tweetStore'

Vue.use(Vuex)
const userState = createPersistedState({
  key: 'user',
  paths: ['userInfo']
})


export default new Vuex.Store({
  plugins: [userState],
  modules: { userInfo, tweetStore }
})
