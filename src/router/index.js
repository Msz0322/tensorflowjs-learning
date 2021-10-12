import {
  createRouter,
  createWebHistory
} from 'vue-router'

import index from '@/pages/index/index.vue'
// 线性回归
import linearRegression from '@/pages/linear-regression/index.vue'
// 归一化
import heightWeight from '@/pages/height-weight/index.vue'

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
  {
    path: '/height-weight',
    component: heightWeight,
    meta:{
      name: '归一化'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router