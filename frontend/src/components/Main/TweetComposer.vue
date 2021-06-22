<template>
  <div class="tweetComposer">
    <ProfilePhoto class="photo" :size="48" :src="`https://picsum.photos/50?random=60c1c48763262f1f1c7d8c6e`"/>

    <div class="composeArea">
      <form @submit="sendTweet($data)">
        <div class="textEditor">
          <textarea
            type="text"
            id="tweetText"
            name="tweetText"
            v-model="tweetText"
            placeholder="Neler oluyor hayatta?"
            rows="1"
            required
          />
        </div>
        <div class="composeFooter">
          <div class="icons">
            <div class="icon">
              <IconGallery />
            </div>
            <div class="icon">
              <IconGif />
            </div>
            <div class="icon">
              <IconPoll />
            </div>
            <div class="icon">
              <IconEmoji />
            </div>
            <div class="icon">
              <IconSchedule />
            </div>
          </div>
          <TwButton ButtonText="Tweet" icon=false></TwButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ProfilePhoto from '../ProfilePhoto.vue'
import IconEmoji from '@/icons/editor/emoji.svg'
import IconGallery from '@/icons/editor/gallery.svg'
import IconGif from '@/icons/editor/gif.svg'
import IconPoll from '@/icons/editor/poll.svg'
import IconSchedule from '@/icons/editor/schedule.svg'
import TwButton from './TwButton.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Composer',

  components: {
    TwButton,
    IconEmoji,
    IconGallery,
    IconGif,
    IconPoll,
    IconSchedule,
    ProfilePhoto
  },
  data: function(){
    return {
      tweetText: ''
    }
  },
  computed:{
    ...mapState(['tweets'])
  },
  methods:{
    ...mapActions(['sendTweet','fetchTweets'])
  }
}
</script>
<style lang="postcss" scoped>
:focus {
  outline: 0.5px solid #969696;
}
.tweetComposer {
  display: flex;
  flex-direction: row;
  padding: 4px 16px;
  width: 100%;
  height: auto;
  border-bottom: 1px solid var(--c-border-color);
  @media (--t) {
    max-width: 599px;
    min-height: 170px;
  }
}

.photo {
  margin-right: 12px;
  padding-top: 4px;
}

.composeArea {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-top: 4px;
}
textarea {
  width: 100%;
  max-width: 460px;
  height: 120px;
  min-height: 120px;
  padding: 12px 10px;
  font-size: 20px;
  resize: none;
}

textarea::placeholder {
  color: #afafaf;
}

.textEditor {
  display: flex;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--c-border-color);
}
.composeFooter {
  display: flex;
  justify-content: space-between;

  margin-top: 12px;
}
.icons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.icon {
  padding: 0 9px;
}
</style>
