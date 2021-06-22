<template>
  <div class="tweet">
    <article>
      <div class="photo">
        <ProfilePhoto :size="48" :src="`https://picsum.photos/50?random=${tweet.user._id}`"/>
      </div>
      <div class="tweetContainer">
        <div class="tweetHeader">
          <div class="authorInfo">
            <CustomText class="name bold">{{tweet.user.name}}</CustomText>
            <CustomText class="slug">@{{tweet.user.username}}</CustomText>
            <CustomText>·</CustomText>
            <CustomText class="time">35m</CustomText>
          </div>
          <IconMoreOpt class="more-icon" />
        </div>
        <div class="tweetContent">
          <CustomText>{{tweet.text}}</CustomText>
        </div>
        <div class="tweetFooter">
          <IconReply />
          <div class="icon" @click="iconClicked = !iconClicked">
            <IconRetweet v-show="!iconClicked" />
            <IconRetweeted v-show="iconClicked" />
          </div>

          <div class="icon" @click="iconClicked = !iconClicked">
            <IconLiked v-show="!iconClicked" />
            <IconUnliked v-show="iconClicked" />
          </div>
          <IconShare />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import CustomText from '../CustomText.vue'
import ProfilePhoto from '../ProfilePhoto.vue'
import IconMoreOpt from '@/icons/common/more-opt.svg'
import IconRetweet from '@/icons/tweet/retweet.svg'
import IconRetweeted from '@/icons/tweet/retweeted.svg'
import IconUnliked from '@/icons/tweet/unliked.svg'
import IconLiked from '@/icons/tweet/liked.svg'
import IconReply from '@/icons/tweet/reply.svg'
import IconShare from '@/icons/tweet/share.svg'

export default {
  name: 'MainTweet',
  components: {
    IconRetweet,
    IconRetweeted,
    IconUnliked,
    IconLiked,
    IconReply,
    IconShare,
    IconMoreOpt,
    CustomText,

    ProfilePhoto
  },
  props: ['tweet'],
  data: function() {
    return {
      iconClicked: false
    }
  }
}
</script>
<style lang="postcss" scoped>
article {
  display: flex;
  flex-direction: row;
  padding: 0 16px;
}
span ~ span {
  margin-left: 4px;
}
svg {
  width: 19px;
  height: 19px;
}
.tweet {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  width: 100%;
  height: auto;
  border-bottom: 1px solid var(--c-border-color);
  @media (--t) {
    max-width: 599px;
  }
}
.photo {
  margin-right: 12px;
}
.tweetContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.tweetHeader,
.tweetFooter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tweetFooter {
  margin-top: 12px;

  @media (--t) {
    max-width: 425px;
  }
}

.tweetContent {
  margin-top: 5px;
}
.authorInfo {
  display: flex;
}
.more-icon {
  width: 18px;
  height: 18px;
}
</style>


