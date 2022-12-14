import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

/* 
  路由的配置：为什么不同用户登录我们的项目，菜单（路由）都是一样的？
  因为咱们的路由‘死的’，不管你是谁，你能看见的，操作的菜单都是一样的
  需要把项目中的路由进行拆分
*/
// 常量路由：无论什么角色（超级管理|员工）登录，都能看见的页面
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }, 
]

// 异步路由：根据和服务器返回的数据比对，不同角色展示不同的组件
export const asyncRoutes = [
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理',
        },
      },
    ]
  },
  {
    path:'/product',
    component:Layout,
    name:'Product',
    meta: { title:'商品管理', icon:'el-icon-goods'},
    children:[
      {
        path:'trademark',
        name:'TradeMark',
        component:() => import('@/views/product/TradeMark'),
        meta:{title:'品牌管理'}
      },
      {
        path:'attr',
        name:'Attr',
        component:() => import('@/views/product/Attr'),
        meta:{title:'平台属性管理'}
      },
      {
        path:'spu',
        name:'Spu',
        component:() => import('@/views/product/Spu'),
        meta:{title:'Spu管理'}
      },
      {
        path:'sku',
        name:'Sku',
        component:() => import('@/views/product/Sku'),
        meta:{title:'Sku管理'}
      },
    ]   
  },
  {
    path:'/btntest',
    component:Layout,
    name:'BtnTest',
    meta: { title:'按钮测试', icon:'el-icon-edit'},
    children:[
      {
        path:'btntest1',
        name:'BtnTest1',
        component:() => import('@/views/Test/Test1'),
        meta:{title:'测试1'}
      },
      {
        path:'btntest2',
        name:'BtnTest2',
        component:() => import('@/views/Test/Test2'),
        meta:{title:'测试2'}
      },
    ]   
  },
]

// 任意路由：都能看见
export const anyRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
