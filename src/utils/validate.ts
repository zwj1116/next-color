import { RuleObject } from 'ant-design-vue/es/form/interface';
import { isEmpty } from '@/utils/is';

// 域名
async function validateDomain(rule: RuleObject, value: string) {
  if (isEmpty(value)) {
    return Promise.reject('域名不能为空');
  }
  if (
    !/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(value)
  ) {
    return Promise.reject('域名不规范');
  } else {
    return Promise.resolve();
  }
}

// 验证linux文件路径
async function validateLinuxPath(rule: RuleObject, value: string) {
  if (value && '...' === value) {
    return Promise.reject('请输入文件路径');
  }
  if (value && !/^\/(\w+\/?)+$/.test(value)) {
    return Promise.reject('请输入合法文件路径，如：/home/usr');
  } else {
    return Promise.resolve();
  }
}

// IP
async function validateIP(rule: RuleObject, value: string) {
  if (isEmpty(value)) {
    return Promise.reject('IP不能为空');
  }
  if (
    value &&
    !/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(
      value
    )
  ) {
    return Promise.reject('IP地址不规范');
  } else {
    return Promise.resolve();
  }
}

// 端口
async function validatePort(rule: RuleObject, value: string) {
  if (isEmpty(value)) {
    return Promise.reject('端口不能为空');
  }
  if (
    !/^([1-9](\d{0,3}))$|^([1-5]\d{4})$|^(6[0-4]\d{3})$|^(65[0-4]\d{2})$|^(655[0-2]\d)$|^(6553[0-5])$/.test(
      value
    )
  ) {
    return Promise.reject('端口范围1-65535');
  } else {
    return Promise.resolve();
  }
}

// 经度
async function validateLon(rule: RuleObject, value: string) {
  if (isEmpty(value)) {
    return Promise.reject('经度不能为空');
  }
  const regex = new RegExp(/^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,10})?)|180(([.][0]{1,10})?))$/);
  if (!regex.test(value)) {
    return Promise.reject(new Error('经度整数部分为0-180,小数部分为0到10位!'));
  } else {
    return Promise.resolve();
  }
}

// 纬度
async function validateLat(rule: RuleObject, value: string) {
  if (isEmpty(value)) {
    return Promise.reject('纬度不能为空');
  }
  const regex = new RegExp(/^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,10})?)|90(([.][0]{1,10})?))$/);
  if (!regex.test(value)) {
    return Promise.reject(new Error('纬度整数部分为-90到90,小数部分为0到10位!'));
  } else {
    return Promise.resolve();
  }
}

// 验证密码
async function validatePass(rule: RuleObject, value: string) {
  if (isEmpty(value)) {
    return Promise.reject('密码不能为空');
  }
  const pwdRegex = new RegExp(
    '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,20}$'
  );
  if (!pwdRegex.test(value)) {
    return Promise.reject(new Error('密码由7位以上的大小写字母、数字及特殊字符中的3种组合而成'));
  } else {
    return Promise.resolve();
  }
}

// 验证邮箱
async function validateEmail(rule: RuleObject, value: string) {
  if (!value) {
    return Promise.reject();
  } else {
    const regex = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$');
    if (!regex.test(value)) {
      return Promise.reject(new Error('请输入正确的邮箱'));
    } else {
      return Promise.resolve();
    }
  }
}

// 手机号
async function validatePhone(rule: RuleObject, value: string) {
  if (!value) {
    return Promise.reject();
  } else {
    const regex = new RegExp('^[1][3-9][\\d]{9}');
    if (!regex.test(value)) {
      return Promise.reject(new Error('请输入正确的手机号码'));
    } else {
      return Promise.resolve();
    }
  }
}
// 7位车牌
async function validateVehicleNumber(rule: RuleObject, value: string) {
  if (value.length == 7) {
    const express =
      /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
    if (express.test(value)) {
      return Promise.reject();
    } else {
      return Promise.reject(new Error('车牌格式不正确'));
    }
  } else {
    return Promise.reject(new Error('请输入7位车牌'));
  }
}

export {
  validateDomain,
  validateLinuxPath,
  validateIP,
  validatePort,
  validateLon,
  validateLat,
  validatePass,
  validateEmail,
  validatePhone,
  validateVehicleNumber,
};
