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
const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      component: () => import('@/pages/Home'),
      meta: { title: '首页' }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/Home'),
      meta: { title: '首页' }
    },
    {
      path: '/matter',
      name: 'Matter',
      component: () => import('@/pages/Matter'),
      meta: { title: '物理引擎' }
    },
    {
      path: '/three',
      name: 'Three',
      component: () => import('@/pages/Three'),
      meta: { title: '3D引擎' }
    },
    {
      path: '/map',
      name: 'Map',
      component: () => import('@/pages/Map'),
      meta: { title: '地图' }
    },
    {
      path: '/weather',
      name: 'Weather',
      component: () => import('@/pages/Weather'),
      meta: { title: '天气' }
    },
    {
      path: '/goods',
      name: 'Goods',
      component: () => import('@/pages/Goods/index.vue'),
      meta: { title: '商品管理' }
    },
  ]
});


export default router
