const Main = resolve => require.ensure([], () => resolve(require('@c/main/index')) )

export default [
  {
    path: '/',
    component: resolve => require.ensure([], () => resolve(require('@/pages/account/index.vue')) ),
  },
  {
    path: '/enter',
    component: resolve => require.ensure([], () => resolve(require('@/pages/home/index.vue')) ),
  },
  {
    path: '/login',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '导入钱包',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/login.vue')) )
      }
    ]
  },
  {
    path: '/register',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '创建钱包',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/register.vue')) )
      }
    ]
  },
  {
    path: '/send',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '发送',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/account/send.vue')) ),
      }
    ]
  },
  
  {
    path: '/person',
    component: resolve => require.ensure([], () => resolve(require('@/pages/person/index.vue')) ),
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '个人中心',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/person/person.vue')) ),
      }
    ]
  },
]