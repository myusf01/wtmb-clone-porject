<template>
  <main-page PageName="explore" ContentName="Hele Hele Explore">
    <CustomText tag="h1">Hele Hele Explore</CustomText>
  </main-page>
</template>

<script>
import MainPage from '@/components/Main/MainPage.vue'
import CustomText from '@/components/CustomText.vue'
export default {
  name: 'Explore',
  components: {
    CustomText,

    MainPage
  }
}
</script>

<style lang="postcss" scoped></style>
