<template>

  <MainPage PageName="Lists" ContentName="Hele Hele Lists">
    <CustomText tag="h1">Hele Hele Lists</CustomText>
  </MainPage>

</template>

<script>
import CustomText from '@/components/CustomText'
import MainPage from '@/components/Main/MainPage.vue'

export default {
  name: 'Lists',
  components: {
    MainPage,
    CustomText
  }
}
</script>

<style lang="postcss" scoped></style>