import Vue from 'vue'
import Router from 'vue-router'
import ResetPassword from '@/components/ResetPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Password',
      component:  ResetPassword
    },

  ]
})
