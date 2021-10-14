import {
  createRouter,
  createWebHistory
} from 'vue-router'

import BaseLayout from '@/layouts/BaseLayout.vue'
import LinearRegression from '@/pages/linear-regression/index.vue'
import HeightWeight from '@/pages/height-weight/index.vue'
import LogisticRegression from '@/pages/logistic-regression/index.vue'
import Xor from '@/pages/xor/index.vue'
import Iris from '@/pages/iris/index.vue'


export const routes = [{
  path: '/',
  component: BaseLayout,
  children: [{
      path: '/linear-regression',
      component: LinearRegression,
      meta: {
        name: '线性回归'
      }
    }, {
      path: '/height-weight',
      component: HeightWeight,
      meta: {
        name: '归一化'
      }
    },
    {
      path: '/logistic-regression',
      component: LogisticRegression,
      meta: {
        name: '逻辑回归'
      }
    },
    {
      path: '/xor',
      component: Xor,
      meta: {
        name: 'XOR'
      }
    },
    {
      path: '/iris',
      component: Iris,
      meta: {
        name: 'Iris'
      }
    },
  ]
}]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router