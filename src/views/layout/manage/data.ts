// import { SvgIcon } from '@/components/Svgicon';

const menus = [
  {
    label: '文章管理',
    key: 'article',
    // icon: () => h(SvgIcon, { iconClass: 'newspaper' }),
    icon: 'newspaper',
  },
  {
    label: '颜色管理',
    key: 'color',
    // icon: () => h(SvgIcon, { iconClass: 'droplet' }),
    icon: 'droplet',
  },
  {
    label: '字典管理',
    key: 'dict',
    // icon: () => h(SvgIcon, { iconClass: 'dict' }),
    icon: 'dict',
  },
  {
    label: '喜欢管理',
    key: 'love',
    // icon: () => h(SvgIcon, { iconClass: 'heart' }),
    icon: 'heart',
  },
];

export default menus;
