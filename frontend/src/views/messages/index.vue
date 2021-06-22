<template>
  <MainPage PageName="Messages" ContentName="Hele Hele Messages">
    <CustomText tag="h1">Hele Hele Messages</CustomText>
  </MainPage>
</template>

<script>
import CustomText from '@/components/CustomText'
import MainPage from '@/components/Main/MainPage.vue'

export default {
  name: 'Messages',
  components: {
    CustomText,
    MainPage
  }
}
</script>

<style lang="postcss" scoped></style>
