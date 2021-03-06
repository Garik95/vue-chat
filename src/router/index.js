import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/chats',
    // redirect: {name: 'chats'},
    component: () => import('../components/layouts/BaseLayout.vue'),
    children: [{
        path: '/chats',
        name: 'chats',
        component: () => import('../views/Home')
      },
      {
        path: '/chats/:id',
        name: 'chat-id',
        component: () => import('../views/Chat.vue')
      },

    ]
  },
  {
    path: '/',
    name: 'LoginPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   // path: "*",
  //   path: "/:catchAll(.*)",
  //   name: "NotFound",
  //   redirect: {name: 'LoginPage'},
  //   // component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
  //   meta: {
  //     requiresAuth: false
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router