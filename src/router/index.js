import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/pages/login/login'
import Mgc from '@/pages/mgc/mgc'
import Home from '@/pages/home/home'
import Order from '@/pages/order/order'
import Shop from '@/pages/shop/shop'
import OrderDetails from '@/pages/orderDetails/orderDetails'
import PersonCenter from '@/pages/personCenter/personCenter'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: '/App',
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Mgc',
      meta: {
        auth: true
      },
      component: Mgc,
      children: [{
        path: '/home',
        name: 'Home',
        meta: {
          auth: true
        },

        component: Home
      },
      {
        path: '/order',
        name: 'Order',
        meta: {
          auth: true
        },
        component: Order
      },
      {
        path: '/orderDetails/:id',
        name: 'OrderDetails',
        meta: {
          auth: true
        },
        component: OrderDetails
      },
      {
        path: '/personcenter',
        name: 'PersonCenter',
        meta: {
          auth: true
        },
        component: PersonCenter
      },
      {
        path: '/shop',
        meta: {
          auth: true
        },
        name: 'Shop',
        component: Shop
      }]
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        auth: false
      },
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  to.matched.some(record => {
    if (record.meta.auth) {
      if (store.state.token.access_token === '' || store.state.token.access_token === null || store.state.token.access_token === 'null' || store.state.token.access_token === undefined || store.state.token.access_token === 'undefined') {
        next('/login')
      } else {
        next()
      }
    } else {
      next()
    }
  })
})
export default router
