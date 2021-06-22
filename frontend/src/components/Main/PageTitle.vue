<template>
  <div class="PageHead">
    <div class="PageTitle">
      <div class="title-text">
        <CustomText is="h1" class="bold large">{{ HeaderTitle }}</CustomText>
      </div>

      <span class="icon"><IconStar /></span>
    </div>
  </div>
</template>

<script>
import CustomText from '../CustomText.vue'
import IconStar from '@/icons/common/star.svg'
export default {
  name: 'PageHead',
  props: {
    HeaderTitle: {
      type: String
    }
  },
  components: {
    CustomText,
    IconStar
  }
}
</script>
<style lang="postcss" scoped>
.PageHead {
  top: 0;
  width: 100%;
  display: flex;
  position: sticky;
  height: 55px;
  background-color: #fff;
  border-bottom: 1px solid var(--c-border-color);
}

.PageTitle {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  @media (--t) {
    margin-right: 0;
  }
}
</style>
