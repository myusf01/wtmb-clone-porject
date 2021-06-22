<template>
  <MainPage PageName="Profile" ContentName="Hele Hele Profile">
    <CustomText tag="h1">Hele Hele Profile</CustomText>

    <nav id="nav">
      <router-link to="/profile">Tweets</router-link> |
      <router-link to="/profile/with-replies">Tweets With Replies</router-link>
      | <router-link to="/profile/media">Media</router-link> |
      <router-link to="/profile/likes">Likes</router-link>
    </nav>

    <router-view />
  </MainPage>
</template>

<script>
import CustomText from '@/components/CustomText'
import MainPage from '@/components/Main/MainPage.vue'
export default {
  name: 'Profile',
  components: {
    MainPage,

    CustomText
  }
}
</script>

<style lang="postcss" scoped></style>
