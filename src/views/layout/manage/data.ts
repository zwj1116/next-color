import { SvgIcon } from '@/components/Svgicon';
import { SettingOutlined } from '@ant-design/icons-vue';

const menus = [
  {
    label: '系统管理',
    key: 'manage',
    icon: () => h(SettingOutlined),
    children: [
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
    ],
    // type: 'group',
  },
];

export default menus;
