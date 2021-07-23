import axios from 'axios'

//store
const state = () => ({
  user: {}
})

//actions
const actions = {
  async createUser({ commit }) {
    const randomUser = await (
      await axios.get('https://randomuser.me/api/?nat=tr&inc=name')
    ).data.results[0].name
    const name = randomUser.first + ' ' + randomUser.last
    const username = randomUser.last + randomUser.first.toUpperCase()
    const createUser = await axios.post(
      `${process.env.VUE_APP_API_URL}/user/`,
      { name: name, username: username }
    )
    console.log(createUser)
    commit('POST_USER', createUser.data)
  }
}

// mutations

const mutations = {
  POST_USER(state, data) {
    state.user = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
