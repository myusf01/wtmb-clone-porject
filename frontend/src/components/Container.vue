<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'container'
}
</script>

<style lang="postcss" scoped>
.container {

  display: flex;
  height: 100%;
  width: 100%;

}
</style>
