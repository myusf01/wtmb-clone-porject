<template>
  <MainPage PageName="Bookmarks" ContentName="Hele Hele Bookmarks">
    <CustomText tag="h1">Hele Hele Bookmarks</CustomText>
  </MainPage>
</template>

<script>
import CustomText from '@/components/CustomText'
import MainPage from '@/components/Main/MainPage.vue'

export default {
  name: 'Bookmarks',
  components: {
    CustomText,
    MainPage
  }
}
</script>

<style lang="postcss" scoped></style>