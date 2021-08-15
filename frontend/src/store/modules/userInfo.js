import axios from 'axios'

//store
const state = {
  user: null}
// getters

const getters = {
  activeUser: state => state.user
}
//actions
const actions = {
  async createUser({ commit }) {
    const randomUser = await (
      await axios.get('https://randomuser.me/api/?nat=tr&inc=name')
    ).data.results[0].name
    const name = randomUser.first + ' ' + randomUser.last
    const username = randomUser.last + randomUser.first.toUpperCase()
    const newUser = await axios.post(
      `${process.env.VUE_APP_API_URL}/user/`,
      { name: name, username: username }
    )
    commit('NEW_USER', newUser.data)
  },

  checkUserInfo(){
    if (this.state.user !== null) return true
    return false
  },

}



// mutations

const mutations = {
  NEW_USER: (state, data) => (state.user = data)
}

export default {
  state,
  actions,
  mutations,
  getters
}
