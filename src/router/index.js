import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/layout';
const Login = () => import('@/views/login/index');
const errorPage = () => import('@/views/404');
const Dashboard = () => import('@/views/dashboard/index');
const DashboardDetail = () => import('@/views/dashboard/dashboardDetail');
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
    hidden: true,
  },

  {
    path: '/404',
    component: errorPage,
    hidden: true,
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
        meta: { title: '首页', icon: 'dashboard' },
      },
      {
        hidden: true,
        path: 'dashboardDetail',
        name: 'DashboardDetail',
        component: DashboardDetail,
        meta: { title: '详情页', icon: 'dashboard', activeMenu: '/dashboard' },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '示例', icon: 'el-icon-s-help', menuId: 10 },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: Table,
        meta: { title: '表格', icon: 'table', menuId: 11 },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: Tree,
        meta: { title: '树', icon: 'tree', menuId: 12 },
      },
      {
        path: 'buttons',
        name: 'Buttons',
        component: buttonPage,
        meta: { title: '按钮', icon: 'buttonicon', menuId: 13 },
      },
    ],
  },

  {
    path: '/compoment',
    component: Layout,
    redirect: '/compoment/icon',
    name: 'compoment',
    meta: { title: '组件', icon: 'el-icon-s-help', menuId: 20 },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        component: Icon,
        meta: { title: '图标', icon: 'tubiao', menuId: 21 },
      },
      {
        path: 'titleLink',
        name: 'Titlelink',
        component: Titlelink,
        meta: { title: '文字链接', icon: 'titlelinkiocn', menuId: 22 },
      },
    ],
  },

  {
    path: '/form',
    component: Layout,
    redirect: '/form/index',
    meta: { title: '表单', icon: 'form', menuId: 30 },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: Form,
        meta: { title: '表单-1', icon: 'form', menuId: 31 },
      },
    ],
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '路由嵌套',
      icon: 'nested',
      menuId: 40,
    },
    children: [
      {
        path: 'menu1',
        component: menuOne,
        name: 'Menu1',
        meta: { title: '菜单1', menuId: 41 },
        children: [
          {
            path: 'menu1-1',
            component: menuOneOne,
            name: 'Menu1-1',
            meta: { title: '菜单1-1', menuId: 42 },
          },
          {
            path: 'menu1-2',
            component: menuOneTwo,
            name: 'Menu1-2',
            meta: { title: '菜单1-2', menuId: 43 },
            children: [
              {
                path: 'menu1-2-1',
                component: menuOneTwoOne,
                name: 'Menu1-2-1',
                meta: { title: '菜单1-2-1', menuId: 44 },
              },
              {
                path: 'menu1-2-2',
                component: menuOneTwoTwo,
                name: 'Menu1-2-2',
                meta: { title: '菜单1-2-2', menuId: 45 },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: menuOneTree,
            name: 'Menu1-3',
            meta: { title: '菜单1-3', menuId: 46 },
          },
        ],
      },
      {
        path: 'menu2',
        component: menuTwo,
        name: 'Menu2',
        meta: { title: '菜单2', menuId: 47 },
      },
    ],
  },

  {
    path: 'external-link',
    component: Layout,
    name: 'externalLink',
    meta: { title: '外部链接', icon: 'link', menuId: 50 },
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外部链接', icon: 'link', menuId: 51 },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: { title: '外部链接', icon: 'link', menuId: 60 },
  },
];

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
