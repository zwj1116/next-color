import { UserOutlined } from '@ant-design/icons-vue';

const menus = [
  {
    label: '系统',
    key: 'system',
    icon: null,
    children: [
      {
        label: '用户',
        key: 'user',
        icon: () => h(UserOutlined),
      },
    ],
    // type: 'group',
  },
];

export default menus;
