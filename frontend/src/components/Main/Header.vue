<template>
  <header class="header">
    <div class="menu">
      <nav class="navigation">
        <router-link to="/"
          ><div class="itemContainer">
            <span class="icon"><IconTwitter class="twitter-icon"/></span></div
        ></router-link>

        <router-link to="/" class="mobile">
          <div class="itemContainer">
            <span class="icon">
              <IconHomeFill v-if="$route.name === 'Home'" /> <IconHome v-else />
            </span>
            <CustomText class="large bold header-text">Home</CustomText>
          </div>
        </router-link>
        <router-link to="/explore" class="mobile">
          <div class="itemContainer">
            <span class="icon">
              <IconExploreFill
                class="desktop-explore"
                v-if="$route.name === 'Explore'"
              />
              <IconExplore class="desktop-explore" v-else />
              <IconSearch-Fill
                class="mobile-explore"
                v-if="$route.name === 'Explore'"
              />
              <IconSearch class="mobile-explore" v-else />
            </span>
            <CustomText class="large bold header-text">Explore</CustomText>
          </div>
        </router-link>
        <router-link to="/notifications" class="mobile">
          <div class="itemContainer">
            <span class="icon">
              <IconNotificationFill v-if="$route.name === 'Notifications'" />
              <IconNotification v-else />
            </span>
            <CustomText class="large bold header-text"
              >Notifications</CustomText
            >
          </div>
        </router-link>
        <router-link to="/messages" class="mobile">
          <div class="itemContainer">
            <span class="icon">
              <IconMessageFill v-if="$route.name === 'Messages'" />
              <IconMessage v-else />
            </span>
            <CustomText class="large bold header-text">Messages</CustomText>
          </div>
        </router-link>
        <router-link to="/bookmarks">
          <div class="itemContainer">
            <span class="icon">
              <IconBookmarkFill v-if="$route.name === 'Bookmarks'" />
              <IconBookmark v-else />
            </span>
            <CustomText class="large bold header-text">Bookmarks</CustomText>
          </div>
        </router-link>
        <router-link to="/lists">
          <div class="itemContainer">
            <span class="icon">
              <IconListsFill v-if="$route.name === 'Lists'" />
              <IconLists v-else />
            </span>
            <CustomText class="large bold header-text">Lists</CustomText>
          </div>
        </router-link>
        <router-link to="/profile">
          <div class="itemContainer">
            <span class="icon">
              <IconProfileFill v-if="$route.name === 'Profile'" />
              <IconProfile v-else />
            </span>
            <CustomText class="large bold header-text">Profile</CustomText>
          </div>
        </router-link>
        <!-- POPUP -->
        <router-link>
          <div class="itemContainer">
            <span class="icon"><IconMore /></span>
            <CustomText class="large bold header-text">More</CustomText>
          </div>
        </router-link>
        <router-link to="/profile"> <account-info :img_src="`https://picsum.photos/50?random=60c1c48763262f1f1c7d8c6e`"/></router-link>
        <!-- <accountInfo to="/profile"></accountInfo> -->
      </nav>
    </div>
  </header>
</template>

<script>
import IconHomeFill from '@/icons/menu/home-fill.svg'
import IconHome from '@/icons/menu/home.svg'
import IconExplore from '@/icons/menu/explore.svg'
import IconExploreFill from '@/icons/menu/explore-fill.svg'
import IconNotification from '@/icons/menu/notification.svg'
import IconNotificationFill from '@/icons/menu/notification-fill.svg'
import IconBookmark from '@/icons/menu/bookmark.svg'
import IconBookmarkFill from '@/icons/menu/bookmark-fill.svg'
import IconLists from '@/icons/menu/lists.svg'
import IconListsFill from '@/icons/menu/lists-fill.svg'
import IconMessage from '@/icons/menu/message.svg'
import IconMessageFill from '@/icons/menu/message-fill.svg'
import IconProfile from '@/icons/menu/profile.svg'
import IconProfileFill from '@/icons/menu/profile-fill.svg'
import IconMore from '@/icons/menu/more.svg'
import IconTwitter from '@/icons/menu/twitter.svg'
import IconSearch from '@/icons/common/search.svg'
import IconSearchFill from '@/icons/common/search-fill.svg'

import accountInfo from '../AccountInfo.vue'
import CustomText from '../CustomText.vue'

// import Container from './Container.vue'

export default {
  name: 'MainHeader',
  components: {
    CustomText,
    accountInfo,
    IconSearchFill,
    IconSearch,
    IconHome,
    IconHomeFill,
    IconExplore,
    IconExploreFill,
    IconNotification,
    IconNotificationFill,
    IconBookmark,
    IconBookmarkFill,
    IconLists,
    IconListsFill,
    IconMessage,
    IconMessageFill,
    IconProfile,
    IconProfileFill,
    IconMore,
    IconTwitter
  }
}
</script>

<style lang="postcss" scoped>
.header {
  z-index: 99;
  position: fixed;
  height: 100%;
  min-height: 500px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border: none;
  width: 100px;

  @media (--d) {
    min-width: 275px;
    /* margin-left: auto; */
  }
  @media (--t) {
    border-right: 1px solid var(--c-border-color);
    position: relative;
  }
}
.menu {
  z-index: 99;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  min-width: 68px;
  height: 100%;
}
.navigation {
  z-index: 90;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid var(--c-border-color);

  a {
    display: none;
  }
  svg {
    width: 27px;
    height: 27px;
  }
  svg.twitter-icon {
    width: 30px;
    height: 30px;
  }
  .header-text {
    display: none;
  }

  .mobile {
    display: inline-block;
  }
  .mobile-explore {
    display: inline-block;
  }
  .desktop-explore {
    display: none;
  }

  @media (--t) {
    padding: 0 12px;

    border: 0;
    height: auto;
    position: static;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      padding: 4px 0;
    }
    a svg {
      display: flex;
      justify-content: center;
      vertical-align: sub;
    }
  }

  @media (--d) {
    border: 0;
    height: 100%;
    width: 275px;
    position: static;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    a {
      display: flex;
      width: 251px;
    }

    a svg {
      display: flex;
      justify-content: center;
    }
    span {
      display: block;
    }

    .header-text {
      display: flex;
      align-items: center;
      margin-left: 20px;
      margin-right: auto;
    }
    .mobile-explore {
      display: none;
    }
    .mobile {
      display: flex;
    }
    .desktop-explore {
      display: flex;
    }
  }
}
.itemContainer {
  display: flex;
  padding: 12px;
}
.account {
  z-index: 99;
  margin-bottom: 12px;
}
</style>

// TODO: // Try to show-hide mobile icons with vue-if tags.
// TODO: // Add notification dot and counter.
