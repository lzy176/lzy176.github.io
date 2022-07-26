import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
const originPush = Router.prototype.push;
const originReplace = Router.prototype.replace;
Router.prototype.push = function (location, res, rej) {
  if (res || rej) return originPush.call(this, location, res, rej);
  originPush.call(this, location, () => { }, () => { });
}
Router.prototype.push = function (location, res, rej) {
  if (res || rej) return originReplace.call(this, location, res, rej);
  originReplace.call(this, location, () => { }, () => { });
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/chart',
    },
    {
      path: '/chart',
      name: 'Chart',
      component: () => import('@/pages/Chart'),
      meta: { title: '图表' }
    },
    {
      path: '/doc',
      name: 'Doc',
      component: () => import('@/pages/Doc'),
      redirect: '/doc/javascript',
      meta: { title: '文档' },
      children: [
        {
          path: 'javascript',
          name: 'Javascript',
          component: () => import('@/pages/Doc/javascript'),
          meta: { title: 'js脚本' }
        },
        {
          path: 'css',
          name: 'Css',
          component: () => import('@/pages/Doc/css'),
          meta: { title: 'ccs样式' }
        }
      ]
    },

    {
      path: '/goods',
      name: 'Goods',
      component: () => import('@/pages/Goods/index.vue'),
      meta: { title: '商品管理' }
    },
  ]
})
