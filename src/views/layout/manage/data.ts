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
        // icon: () => h(UserOutlined),
        icon: () => h(SvgIcon, { iconClass: 'newspaper' }),
      },
    ],
    // type: 'group',
  },
];

export default menus;
