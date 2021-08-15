<template>
  <div class="contentContainer">
    <Page :PageName="PageName" :ContentName="ContentName">
      <slot />
    </Page>

    <widgets />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Page from '@/components/Main/Page.vue'
import Widgets from '@/components/Main/Widgets.vue'
export default {
  name: 'MainPage',
  props: {
    PageName: {
      type: String
    },
    ContentName: {
      type: String
    }
  },
  components: {
    Widgets,
    Page
  },
  methods: {
    ...mapActions(['createUser'])
  },
  computed: {
    ...mapGetters(['activeUser'])
  },
  created() {
    if(this.activeUser === null){
      this.createUser()
    }
  }
}
</script>
<style lang="postcss" scoped>
.contentContainer {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  width: 100%;
  @media (--t) {
    grid-template-columns: 1fr 370px;

    grid-gap: 30px;
  }
}
</style>
