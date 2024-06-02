import { notification } from 'ant-design-vue';
import router from '@/router';

window.addEventListener('offline', () => {
  notification['error']({
    message: '网络连接已断开',
    description: '请检查网络',
    duration: 4,
  });
});

window.addEventListener('online', () => {
  notification['success']({
    message: '网络连接已恢复',
    description: '即将刷新当前页面',
  });
  setTimeout(() => {
    router.go(0);
  }, 1000);
});

/**
 * 目的，对于定时请求部分，页面隐藏或者电脑休眠时候，可以取消页面的请求，防止猛的打开页面，不停渲染
 */
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    console.log('隐藏');
  } else {
    console.log('显示');
  }
});
