import {
  createRouter,
  createWebHistory
} from 'vue-router'

import index from '@/pages/index/index.vue'
// 线性回归
import linearRegression from '@/pages/linear-regression/index.vue'

export const routes = [{
    path: '/',
    component: index,
    meta:{
      name: '首页'
    }
  },
  {
    path: '/linear-regression',
    component: linearRegression,
    meta:{
      name: '线性回归'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router