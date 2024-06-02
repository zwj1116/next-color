import { App } from 'vue';
import {
  Input,
  Button,
  notification,
  ConfigProvider,
  Modal,
  Select,
  DatePicker,
  message,
  Calendar,
  Radio,
  Row,
  Col,
  Menu,
  Layout,
} from 'ant-design-vue';

const components = [
  Input,
  Button,
  ConfigProvider,
  Modal,
  Select,
  DatePicker,
  message,
  Calendar,
  Radio,
  Row,
  Col,
  Menu,
  Layout,
];

export default function setupAntd(app: App<Element>) {
  notification.config({
    duration: 1.5,
  });
  components.forEach((component: any) => {
    app.use(component);
  });
}
import '@/styles/index.less';
