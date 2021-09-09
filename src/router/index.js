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
      component: () => import('@/views/import-tool/UploadFile.vue'),
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
      path: '/imported-files',
      name: 'imported-files',
      component: () => import('@/views/import-tool/ImportedFiles.vue'),
      meta: {
        pageTitle: 'Imported Files',
        breadcrumb: [
          {
            text: 'Imported Files',
            active: true,
          },
        ],
      },
    },
    {
      path: '/imported-file/:id',
      name: 'imported-file',
      component: () => import('@/views/import-tool/ImportedFileView.vue'),
      meta: {
        pageTitle: 'Imported File',
        breadcrumb: [
          {
            text: 'Imported Files',
          },
          {
            text: 'Imported File',
            active: true,
          },
        ],
      },
    },
    {
      path: '/task-view/:id',
      name: 'task-view',
      component: () => import('@/views/import-tool/TaskView.vue'),
      meta: {
        pageTitle: 'Task View',
        breadcrumb: [
          {
            text: 'Imported Files',
          },
          {
            text: 'Task View',
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
