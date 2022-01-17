import Vue from 'vue'
import VueRouter from 'vue-router'
import { Auth } from 'aws-amplify'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'upload-file',
      component: () => import('@/views/import-tool/upload/UploadFile.vue'),
      meta: {
        pageTitle: 'Upload File',
        breadcrumb: [
          {
            text: 'Upload File',
            active: true,
          },
        ],
      },
    },
    {
      path: '/task-view/delinquency',
      name: 'task-view-delinquency',
      component: () => import('@/views/import-tool/task-view/delinquency/Delinquency.vue'),
      meta: {
        pageTitle: 'Task View',
        breadcrumb: [
          {
            text: 'Delinquency',
            active: true,
          },
        ],
      },
    },
    {
      path: '/task-view/eviction',
      name: 'task-view-eviction',
      component: () => import('@/views/import-tool/task-view/eviction/Eviction.vue'),
      meta: {
        pageTitle: 'Task View',
        breadcrumb: [
          {
            text: 'Eviction',
            active: true,
          },
        ],
      },
    },
    {
      path: '/task-view/foreclosure',
      name: 'task-view-foreclosure',
      component: () => import('@/views/import-tool/task-view/foreclosure/Foreclosure.vue'),
      meta: {
        pageTitle: 'Task View',
        breadcrumb: [
          {
            text: 'Foreclosure',
            active: true,
          },
        ],
      },
    },
    {
      path: '/task-view/probate',
      name: 'task-view-probate',
      component: () => import('@/views/import-tool/task-view/probate/Probate.vue'),
      meta: {
        pageTitle: 'Task View',
        breadcrumb: [
          {
            text: 'Probate',
            active: true,
          },
        ],
      },
    },
    {
      path: '/task-view/tax-auction',
      name: 'task-view-tax-auction',
      component: () => import('@/views/import-tool/task-view/tax-auction/TaxAuction.vue'),
      meta: {
        pageTitle: 'Task View',
        breadcrumb: [
          {
            text: 'Tax Auction',
            active: true,
          },
        ],
      },
    },
    {
      path: '/property-stack',
      name: 'property-stack',
      component: () => import('@/views/property-stack/PropertyStack.vue'),
      meta: {
        pageTitle: 'Property Stack',
        breadcrumb: [
          {
            text: 'Property Stack',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  Auth.currentAuthenticatedUser()
    // eslint-disable-next-line consistent-return
    .then(() => {
      if (to.name === 'login') {
        return next({ name: 'upload-file' })
      }
      next()
    })
    // eslint-disable-next-line consistent-return
    .catch(() => {
      if (to.name !== 'login') {
        return next({ name: 'login' })
      }
      next()
    })
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
