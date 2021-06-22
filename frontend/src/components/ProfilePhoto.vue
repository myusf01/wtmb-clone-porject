<template>
  <figure class="profile-pic">
    <img :src="src" :alt="alt" :width="size" :height="size" />
  </figure>
</template>

<script>
export default {
  name: 'profile-pic',
  props: {
    src: {
      type: String,
      default:
        'https://pbs.twimg.com/profile_images/1010240027643834373/rYvfy2P-_400x400.jpg'
    },
    alt: {
      type: String
    },
    size: {
      type: Number
    }
  }
}
</script>

<style lang="postcss" scoped>
.profile-pic {
  display: inline-flex;
  img {
    border-radius: 999px;
  }
}
</style>
