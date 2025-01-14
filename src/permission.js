import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import { constantRoutes, asyncRoutes } from '@/router';
import _ from 'lodash';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          console.log('======');
          // get user info
          await store.dispatch('user/getInfo');
          let permissionArray = getPermissionMenus();
          router.options.routes = [...constantRoutes, ...permissionArray];
          router.addRoutes(permissionArray);
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

function getPermissionMenus() {
  let cloneMenuArray = _.cloneDeep(asyncRoutes);

  console.log('cloneMenuArray', cloneMenuArray);

  let filterArray = filterByMenuId(cloneMenuArray);
  filterArray.forEach((resItem) => {
    filterArrayMethod(resItem);
  });

  return filterArray;
}

function filterByMenuId(menusArray) {
  let menuIdArray = store.state.user.permissionMenu;
  return menusArray.filter((item) => menuIdArray.includes(item.meta.menuId));
}

function filterArrayMethod(item) {
  if (item.children && Array.isArray(item.children)) {
    item.children = filterByMenuId(item.children);
    item.children.forEach((elementItem) => {
      filterArrayMethod(elementItem);
    });
  }
}
