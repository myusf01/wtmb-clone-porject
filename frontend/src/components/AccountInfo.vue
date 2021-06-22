<template>
  <div class="account">
    <div class="pic"><ProfilePic :size="40" :src="img_src"/></div>

    <div class="user-info">
      <CustomText id="name" class="bold">Muhammed Yusuf</CustomText>
      <CustomText id="slug">@myusf_0</CustomText>
    </div>
    <div class="options-icon"><IconMoreOpt /></div>
  </div>
</template>

<script>
import CustomText from './CustomText.vue'
import ProfilePic from './ProfilePhoto.vue'
import IconMoreOpt from '@/icons/common/more-opt.svg'
export default {
  name: 'account_info',
  components: {
    ProfilePic,
    CustomText,
    IconMoreOpt
  },
  props:{
    img_src:{
      type: String
    }
  }
}
</script>
<style lang="postcss" scoped>
.options-icon {
  display: none;
  @media (--d) {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin-left: auto;
    width: 23px;
    height: 23px;
  }
}
.account {
  bottom: 0;
  /* padding: 0 12px; */
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  @media (--d) {
    position: absolute;

    width: 251px;
    max-width: 275px;
  }
}
.pic {
  padding: 12px;
}
.user-info {
  display: none;
  @media (--d) {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
}
span {
  display: inline-block;
}

</style>
