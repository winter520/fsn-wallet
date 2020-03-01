const Main = resolve => require.ensure([], () => resolve(require('@c/main/index.vue')) )

/**
 * @param navBtmCur
 * '1': 首页
 * '2': 查找
 * '3': 我的
 * @param showHdOrBtn
 * '1': All
 * '2': Top
 * '3': Bottom
 */

export default [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        meta: {
          showHdOrBtn: '3',
          navBtmCur: '1'
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/account/index.vue')) ),
      }
    ]
  },
  {
    path: '/send',
    component: Main,
    children: [
      {
        path: '/',
        meta: {
          title: '发送',
          lang: 'send',
          showHdOrBtn: '1',
          navBtmCur: '1'
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/account/send.vue')) ),
      }
    ]
  },
  {
    path: '/enter',
    component: resolve => require.ensure([], () => resolve(require('@/pages/home/index.vue')) ),
  },
  {
    path: '/login',
    component: Main,
    children: [
      {
        path: '/',
        meta: {
          title: '导入钱包',
          lang: 'importWt',
          showHdOrBtn: '2',
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/login.vue')) )
      }
    ]
  },
  {
    path: '/register',
    component: Main,
    children: [
      {
        path: '/',
        meta: {
          title: '创建钱包',
          lang: 'createWt',
          showHdOrBtn: '2',
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/register.vue')) )
      }
    ]
  },
  {
    path: '/person',
    component: Main,
    children: [
      {
        path: '/',
        meta: {
          title: '个人中心',
          lang: 'personCenter',
          showHdOrBtn: '3',
          navBtmCur: '3'
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/person/index.vue')) ),
      },
    ]
  },
  {
    path: '/person/wallet',
    component: Main,
    children: [
      {
        path: '/',
        meta: {
          title: '钱包管理',
          lang: 'wtManger',
          showHdOrBtn: '1',
          navBtmCur: '3'
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/person/wallet/list.vue')) ),
      },
      {
        path: '/person/wallet/dtil',
        meta: {
          title: '钱包详情',
          lang: 'wtDtil',
          showHdOrBtn: '1',
          navBtmCur: '3'
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/person/wallet/dtil.vue')) ),
      }
    ]
  },
  {
    path: '/person/address',
    component: Main,
    children: [
      {
        path: '/',
        meta: {
          title: '地址管理',
          lang: 'addrManger',
          showHdOrBtn: '1',
          navBtmCur: '3'
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/person/address/list.vue')) ),
      },
      {
        path: '/person/address/add',
        meta: {
          title: '新增地址',
          lang: 'newAdd',
          showHdOrBtn: '1',
          navBtmCur: '3'
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/person/address/add.vue')) ),
      },
      {
        path: '/person/address/edit',
        meta: {
          title: '地址编辑',
          lang: 'editAddr',
          showHdOrBtn: '1',
          navBtmCur: '3'
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/person/address/edit.vue')) ),
      }
    ]
  },
  {
    path: '/person/node',
    component: Main,
    children: [{
      path: '/',
      meta: {
        title: '设置节点',
        lang: 'nodeManger',
        showHdOrBtn: '1',
        navBtmCur: '3'
      },
      component: resolve => require.ensure([], () => resolve(require('@/pages/person/node.vue')) ),
    }]
  },
  {
    path: '/person/set',
    component: Main,
    children: [{
      path: '/',
      meta: {
        title: '设置',
        lang: 'set',
        showHdOrBtn: '1',
        navBtmCur: '3'
      },
      component: resolve => require.ensure([], () => resolve(require('@/pages/person/set/index.vue')) ),
    }]
  },
  {
    path: '/search',
    component: Main,
    children: [{
      path: '/',
      meta: {
        title: '搜索',
        lang: 'search',
        showHdOrBtn: '1',
        navBtmCur: '2'
      },
      component: resolve => require.ensure([], () => resolve(require('@/pages/search/index.vue')) ),
    }]
  },
]