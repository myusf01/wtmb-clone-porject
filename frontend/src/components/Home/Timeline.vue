<template>
  <MainPage PageName="timeline" ContentName="Hele Hele Dünya">
      <TweetComposer/>
    <Tweet v-for="tweet in tweets" :key="tweet._id" :tweet="tweet"> </Tweet>
  </MainPage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MainPage from '../Main/MainPage.vue'
import Tweet from '../Main/Tweet.vue'
import TweetComposer from '../Main/TweetComposer.vue'
export default {
  name: 'timeline',
  components: {
    TweetComposer,
    Tweet,
    MainPage
  },
  computed: {
    ...mapState(['tweets'])
  },
  methods: {
    ...mapActions(['fetchTweets'])
  },
  created() {
    this.fetchTweets()
  }
}
</script>

<style lang="postcss" scoped>
CustomText {
  display: inline-block;
}
</style>
