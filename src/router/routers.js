const Bg = resolve => require.ensure([], () => resolve(require('@c/bg/index')) )

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
    component: Bg,
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
    component: Bg,
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
    component: Bg,
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
]