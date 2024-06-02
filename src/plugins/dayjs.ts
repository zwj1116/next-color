import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
//RelativeTime 增加了 .from .to .fromNow .toNow 4 个 API 来展示相对的时间
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
