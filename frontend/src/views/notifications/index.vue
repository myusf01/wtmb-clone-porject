<template>
  <MainPage PageName="notifications" ContentName="Hele Hele Notifications">
    <CustomText tag="h1">Hele Hele Notifications</CustomText>
  </MainPage>
</template>

<script>
import CustomText from '@/components/CustomText'
import MainPage from '@/components/Main/MainPage.vue'
export default {
  name: 'Notifications',
  components: {
    MainPage,

    CustomText
  }
}
</script>

<style lang="postcss" scoped></style>