import { SvgIcon } from '@/components/Svgicon';

const menus = [
  {
    label: '文章管理',
    key: 'article',
    icon: () => h(SvgIcon, { iconClass: 'newspaper' }),
  },
  {
    label: '颜色管理',
    key: 'color',
    icon: () => h(SvgIcon, { iconClass: 'droplet' }),
  },
  {
    label: '字典管理',
    key: 'dict',
    icon: () => h(SvgIcon, { iconClass: 'dict' }),
  },
  {
    label: '喜欢管理',
    key: 'love',
    icon: () => h(SvgIcon, { iconClass: 'heart' }),
  },
];

export default menus;
