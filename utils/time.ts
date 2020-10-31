import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';

export const displayLocalizedDatetime = (dt: Date): string => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(calendar);
  return dayjs.tz(dt, 'America/New_York').calendar(undefined, {
    sameDay: '[today at] h:mm A', // The same day ( Today at 2:30 AM )
    nextDay: '[tomorrow]', // The next day ( Tomorrow at 2:30 AM )
    nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
    lastDay: '[yesterday]', // The day before ( Yesterday at 2:30 AM )
    lastWeek: '[last] dddd', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'on DD/MM/YYYY', // Everything else ( 7/10/2011 )
  });
};
