<template>
    <home-timeline-vue />
</template>

<script>

import homeTimelineVue from './timeline/index.vue'
export default {
  name: 'Home',
  components: {
    homeTimelineVue

  }
}
</script>

<style>
.a1 {
  color: var(--c-theme);
}

</style>
