import type { App, Plugin } from 'vue';
import { useBasicStore } from '@/store/modules/basic';
import CryptoJS from 'crypto-js';

export function isNotEmpty(obj: any): boolean {
  return obj !== '' && obj != null;
}

//UUID
export function guid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

export const locationTo = (location: string) => {
  window.location.replace(location);
};

export const compare = (key: any, desc: any) => {
  //key:  用于排序的数组的key值
  //desc： 布尔值，为true是升序排序，false是降序排序
  return function (a: any, b: any) {
    const value1 = a[key];
    const value2 = b[key];
    if (desc == true) {
      // 升序排列
      return value1 - value2;
    } else {
      // 降序排列
      return value2 - value1;
    }
  };
};
export const checkScreenSize = () => {
  window.addEventListener('resize', () => {
    useBasicStore().setIsMobile(window.innerWidth < 576);
  });
};

export const encrypt = (pwd: string) => {
  const key = CryptoJS.enc.Utf8.parse('Zwj592501428@'); // 注意：密钥必须是32位
  const iv = CryptoJS.enc.Utf8.parse('Zwj592501428@'); // 注意：向量通常为16位

  // 使用AES加密
  const encrypted = CryptoJS.AES.encrypt(pwd, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // 将加密后的数据转换为Base64字符串以便传输
  return encrypted.toString(CryptoJS.format.Base64);
};
