import { SvgIcon } from '@/components/Svgicon/index';
import { App } from 'vue';

export default function setupSvgIcon(app: App<Element>) {
  app.component('SvgIcon', SvgIcon);
}

//递归扫描当前目录下所有的以.svg结尾的文件
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext);

const common = require.context('@icons', true, /\.svg$/);

requireAll(common);
