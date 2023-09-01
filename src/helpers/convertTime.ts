import { formatDistanceToNow } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

export const convertTime = (time: Date) => {
  return formatDistanceToNow(new Date(time), { addSuffix: true, locale: viLocale });
}