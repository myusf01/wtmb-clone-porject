<template>
  <div class="Profile">
    <CustomText tag="h1">Hele Hele Profile Tweets</CustomText>
    <Tweet v-for="tweet in tweets" :key="tweet._id" :tweet="tweet"> </Tweet>
  </div>
</template>

<script>
import CustomText from '@/components/CustomText'
import Tweet from '@/components/Main/Tweet.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    Tweet,
    CustomText
  },
  computed: {
    ...mapGetters(['tweets'])
  },
  methods: {
    ...mapActions(['fetchUser'])
  },
  created() {
    this.fetchUser()
  }
}
</script>

<style lang="postcss" scoped></style>
