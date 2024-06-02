import dayjs from 'dayjs';

export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(
  date: dayjs.ConfigType | undefined = undefined,
  format = DATE_TIME_FORMAT
): string {
  return date ? dayjs(date).format(format) : '--';
}

export function formatToDate(
  date: dayjs.ConfigType | undefined = undefined,
  format = DATE_FORMAT
): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
