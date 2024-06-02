import { validatePass } from './validate';

interface Rule {
  required?: boolean;
  message?: string;
  trigger: string;
  min?: number;
  max?: number;
  validator?: unknown;
}

const noEmptyObj = (val: string): Rule => {
  return { required: true, message: `${val}不能为空`, trigger: 'change' };
};

const noEmpty = (val: string): [Rule] => {
  return [noEmptyObj(val)];
};

const companyId: [Rule] = noEmpty('企业');

const name = (val: string): Array<Rule> => {
  return [noEmptyObj(val), { min: 2, max: 20, message: `${val}需要在2-20位`, trigger: 'change' }];
};
const password: Array<Rule> = [{ validator: validatePass, trigger: 'change', required: true }];

const descRequired: Array<Rule> = [
  noEmptyObj('描述信息'),
  { min: 2, max: 120, message: '描述信息需2-120位', trigger: 'change' },
];

const desc: Array<Rule> = [{ min: 2, max: 120, message: '描述信息需2-120位', trigger: 'change' }];

export default {
  noEmpty,
  noEmptyObj,
  name,
  companyId,
  password,
  desc,
  descRequired,
};
