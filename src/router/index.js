import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/layout';
const Login = () => import('@/views/login/index');
const errorPage = () => import('@/views/404');
const Dashboard = () => import('@/views/dashboard/index');
const Table = () => import('@/views/table/index');
const Tree = () => import('@/views/tree/index');
const buttonPage = () => import('@/views/buttons/buttons');
const Form = () => import('@/views/form/index');
const menuOne = () => import('@/views/nested/menu1/index');
const menuOneOne = () => import('@/views/nested/menu1/menu1-1');
const menuOneTwo = () => import('@/views/nested/menu1/menu1-2');
const menuOneTwoOne = () => import('@/views/nested/menu1/menu1-2/menu1-2-1');
const menuOneTwoTwo = () => import('@/views/nested/menu1/menu1-2/menu1-2-2');
const menuOneTree = () => import('@/views/nested/menu1/menu1-3');
const menuTwo = () => import('@/views/nested/menu2/index');
const Icon = () => import('@/views/compoments/icon');
const Titlelink = () => import('@/views/compoments/titleLink');

export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },

  {
    path: '/404',
    component: errorPage,
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '示例', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: Table,
        meta: { title: '表格', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: Tree,
        meta: { title: '树', icon: 'tree' }
      },
      {
        path: 'buttons',
        name: 'Buttons',
        component: buttonPage,
        meta: { title: '按钮', icon: 'buttonicon' }
      }
    ]
  },

  {
    path: '/compoment',
    component: Layout,
    redirect: '/compoment/icon',
    name: 'compoment',
    meta: { title: '组件', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        component: Icon,
        meta: { title: '图标', icon: 'tubiao' }
      },
      {
        path: 'titleLink',
        name: 'Titlelink',
        component: Titlelink,
        meta: { title: '文字链接', icon: 'titlelinkiocn' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: Form,
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '路由嵌套',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: menuOne,
        name: 'Menu1',
        meta: { title: '菜单1' },
        children: [
          {
            path: 'menu1-1',
            component: menuOneOne,
            name: 'Menu1-1',
            meta: { title: '菜单1-1' }
          },
          {
            path: 'menu1-2',
            component: menuOneTwo,
            name: 'Menu1-2',
            meta: { title: '菜单1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: menuOneTwoOne,
                name: 'Menu1-2-1',
                meta: { title: '菜单1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: menuOneTwoTwo,
                name: 'Menu1-2-2',
                meta: { title: '菜单1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: menuOneTree,
            name: 'Menu1-3',
            meta: { title: '菜单1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: menuTwo,
        name: 'Menu2',
        meta: { title: '菜单2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
