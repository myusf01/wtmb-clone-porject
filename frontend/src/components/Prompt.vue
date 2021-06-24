<template>
  <div/>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Prompt',
  computed: {
    ...mapState(['user']),

    checkMember() {
      const checkConfirm = confirm('Üye misiniz?')
      if (checkConfirm) {
        return true
      }
      return false
    },
    getInfo() {
      let userInfo = {
        name: '',
        username: ''
      }
      if (this.checkMember) {
        let userID = prompt('UserID giriniz')
        console.log(userID)
        // Set active user to userID
      } else {
        let getName = prompt('Adını gir!')
        let getSlug = prompt('Kullanıcı adını gir!')

        userInfo.name = getName
        userInfo.username = getSlug
      }
      return userInfo
    }
  },
  methods: {
    ...mapActions(['createUser'])
  },
  created() {
  },
  data() {
    return {
      name: {
        type: String
      },
      username: {
        type: String
      }
    }
  }
}
</script>
