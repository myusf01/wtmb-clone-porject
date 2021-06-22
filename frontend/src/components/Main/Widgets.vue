<template>
  <div class="widgets">
    <CustomText class="a1"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eaque
      adipisci doloribus culpa quasi vero perspiciatis a est dolorem temporibus
      rem omnis repellat neque optio aut, architecto esse iure
      minus.</CustomText
    >
  </div>
</template>

<script>
import CustomText from '../CustomText.vue'
export default {
  name: 'Widgets',
  components: {
    CustomText
  }
}
</script>

<style lang="postcss" scoped>
.widgets {
  display: none;
  @media (--t) {
    display: flex;
    width: 350px;
    padding-right: 1px;
  }
}
CustomText {
  display: inline-block;
}
</style>
