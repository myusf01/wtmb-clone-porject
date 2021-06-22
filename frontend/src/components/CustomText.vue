<template>
  <component :is="tag" :class="size">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    tag: {
      default: 'span'
    },
    size: {
      type: String,
      default: 'normal', // normal:15, large:20, small:13
      validator: function(value) {
        return ['normal', 'large', 'small','bold'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style lang="postcss" scoped>

.normal {
}
.small {
  font-size: 13px;
}
.large {
  font-size: 20px;
}
.bold{
  font-weight: 700;
}
</style>
