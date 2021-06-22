import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () =>
      import(/* webpackChunkName: "explore" */ '../views/explore')
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () =>
      import(/* webpackChunkName: "messages" */ '../views/messages')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () =>
      import(/* webpackChunkName: "notifications" */ '../views/notifications')
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import(/* webpackChunkName: "lists" */ '../views/lists')
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: () =>
      import(/* webpackChunkName: "bookmarks" */ '../views/bookmarks')
  },

  {
    path: '/profile',
    name: 'Profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/profile'),
    children: [
      {
        path: '',
        name: 'Profile',
        component: () =>
          import(/* webpackChunkName: "profile" */ '../views/profile/tweets')
      },
      {
        path: 'with-replies',
        name: 'ProfileWithReplies',
        component: () =>
          import(
            /* webpackChunkName: "profile" */ '../views/profile/with-replies'
          )
      },
      {
        path: 'media',
        name: 'ProfileMedia',
        component: () =>
          import(/* webpackChunkName: "profile" */ '../views/profile/media')
      },
      {
        path: 'likes',
        name: 'ProfileLikes',
        component: () =>
          import(/* webpackChunkName: "profile" */ '../views/profile/likes')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
