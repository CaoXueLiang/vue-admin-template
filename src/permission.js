import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import { constantRoutes, asyncRoutes } from '@/router';
import _, { first } from 'lodash';

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
          // get user info
          await store.dispatch('user/getInfo');
          getPermissionMenus();
          router.options.routes = [...constantRoutes, ...asyncRoutes];
          router.addRoutes(asyncRoutes);
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
  let totalArray = [];
  let cloneMenuArray = _.cloneDeep(asyncRoutes);
  console.log(cloneMenuArray);
  // for (let index = 0; index < cloneMenuArray.length; index++) {
  //   let firstElement = cloneMenuArray[index];
  //   if (filterByMenuId(firstElement)) {
  //     let firstChildren = firstElement.children;
  //     let tmpFirstChildren = [];
  //     if (firstChildren) {
  //       for (let secondindex = 0; secondindex < firstChildren.length; secondindex++) {
  //         let secondElement = firstChildren[secondindex];
  //         if (filterByMenuId(secondElement)) {
  //           let secondChildren = secondElement.children;
  //           let tmpSecondChildren = [];
  //           if (secondChildren) {
  //             for (let thirdIndx = 0; thirdIndx < secondChildren.length; thirdIndx++) {
  //               let thirdElement = secondChildren[thirdIndx];
  //               if (filterByMenuId(thirdElement)) {
  //                 let thirdChildren = thirdElement.children;
  //                 for (let fourthindex = 0; fourthindex < thirdChildren.length; fourthindex++) {
  //                   let fourthElement = thirdChildren[fourthindex];
  //                   if (filterByMenuId(fourthElement)) {
  //                   }
  //                 }
  //                 tmpSecondChildren.push(thirdElement);
  //               }
  //             }
  //           }
  //           secondElement.children = tmpSecondChildren;
  //           tmpFirstChildren.push(secondElement);
  //         }
  //       }
  //     }
  //     firstElement.children = tmpFirstChildren;
  //     totalArray.push(firstElement);
  //   }
  // }
  return totalArray;
}

function filterByMenuId(element) {
  let menuIdArray = store.state.user.permissionMenu;
  return menuIdArray.includes(element.meta.menuId);
}
