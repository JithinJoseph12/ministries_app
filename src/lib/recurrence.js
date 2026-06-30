import { RRule } from 'rrule';

const WEEKDAYS = {
  Sunday: RRule.SU,
  Monday: RRule.MO,
  Tuesday: RRule.TU,
  Wednesday: RRule.WE,
  Thursday: RRule.TH,
  Friday: RRule.FR,
  Saturday: RRule.SA
};

const FREQ_MAP = {
  daily: RRule.DAILY,
  weekly: RRule.WEEKLY,
  monthly: RRule.MONTHLY,
  yearly: RRule.YEARLY
};

const MONTHS = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
};

export function scheduleToRRule(schedule) {
  const r = schedule.recurrence;
  if (!r || !r.enabled || r.frequency === 'none') return null;

  if (!schedule.startDate) return null;
  const [sy, sm, sd] = schedule.startDate.split('-').map(Number);
  
  // Use UTC to avoid any timezone shifting during generation
  const dtstart = new Date(Date.UTC(sy, sm - 1, sd));
  
  let options = {
    freq: FREQ_MAP[r.frequency],
    dtstart: dtstart,
    interval: r.interval || 1,
  };

  if (r.endCondition === 'afterCount' && r.count) {
    options.count = r.count;
  } else if (r.endCondition === 'onDate' && r.until) {
    const [uy, um, ud] = r.until.split('-').map(Number);
    options.until = new Date(Date.UTC(uy, um - 1, ud, 23, 59, 59));
  }

  if (r.frequency === 'weekly' && r.weekdays && r.weekdays.length > 0) {
    options.byweekday = r.weekdays.map(d => WEEKDAYS[d]).filter(Boolean);
  } else if (r.frequency === 'monthly') {
    if (r.monthlyType === 'dayOfMonth' || !r.monthlyType) {
      options.bymonthday = [r.dayOfMonth || sd];
    } else if (r.monthlyType === 'weekdayPattern' && r.weekday && r.weekNumber) {
      const weekday = WEEKDAYS[r.weekday];
      if (weekday) {
        if (r.weekNumber === 'First') options.byweekday = [weekday.nth(1)];
        else if (r.weekNumber === 'Second') options.byweekday = [weekday.nth(2)];
        else if (r.weekNumber === 'Third') options.byweekday = [weekday.nth(3)];
        else if (r.weekNumber === 'Fourth') options.byweekday = [weekday.nth(4)];
        else if (r.weekNumber === 'Last') options.byweekday = [weekday.nth(-1)];
      }
    }
  } else if (r.frequency === 'yearly') {
    if (r.yearlyMonth && r.yearlyDay) {
      options.bymonth = [MONTHS[r.yearlyMonth]];
      options.bymonthday = [r.yearlyDay];
    } else {
        options.bymonth = [sm];
        options.bymonthday = [sd];
    }
  }

  try {
    return new RRule(options);
  } catch (err) {
    console.error('Failed to parse RRule:', err);
    return null;
  }
}

export function generateOccurrencesForWindow(schedule, startStr, endStr) {
  if (!schedule.startDate) return [];

  const r = schedule.recurrence;
  const [sy, sm, sd] = schedule.startDate.split('-').map(Number);
  
  let durationDays = 0;
  if (schedule.endDate && schedule.endDate !== schedule.startDate) {
      const [ey, em, ed] = schedule.endDate.split('-').map(Number);
      const startD = new Date(Date.UTC(sy, sm - 1, sd));
      const endD = new Date(Date.UTC(ey, em - 1, ed));
      durationDays = Math.round((endD - startD) / (1000 * 60 * 60 * 24));
  }

  if (!r || !r.enabled || r.frequency === 'none') {
    const dates = [];
    const current = new Date(Date.UTC(sy, sm - 1, sd));
    for (let i = 0; i <= Math.max(0, durationDays); i++) {
        const d = new Date(current);
        d.setUTCDate(d.getUTCDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        if (dateStr >= startStr && dateStr <= endStr) {
            dates.push(dateStr);
        }
    }
    return dates;
  }
  
  const rule = scheduleToRRule(schedule);
  if (!rule) return [];
  
  const [winStartY, winStartM, winStartD] = startStr.split('-').map(Number);
  const [winEndY, winEndM, winEndD] = endStr.split('-').map(Number);
  
  const beforeStart = new Date(Date.UTC(winStartY, winStartM - 1, winStartD - Math.max(0, durationDays)));
  const winEnd = new Date(Date.UTC(winEndY, winEndM - 1, winEndD, 23, 59, 59));

  const instances = rule.between(beforeStart, winEnd, true);
  const results = new Set();
  
  for (const instance of instances) {
      for (let i = 0; i <= durationDays; i++) {
          const d = new Date(instance);
          d.setUTCDate(d.getUTCDate() + i);
          const dateStr = d.toISOString().split('T')[0];
          if (dateStr >= startStr && dateStr <= endStr) {
              results.add(dateStr);
          }
      }
  }
  
  return Array.from(results).sort();
}

const nthMap = {
    '1': '1st', '2': '2nd', '3': '3rd', '21': '21st', '22': '22nd', '23': '23rd', '31': '31st'
};
function getOrdinalNum(n) {
    return nthMap[n] || n + 'th';
}

export function generateRecurrenceSummary(schedule) {
    const r = schedule.recurrence;
    if (!r || !r.enabled || r.frequency === 'none') return '';
    
    let summary = '';
    
    if (r.frequency === 'daily') {
        if (r.interval === 1) summary = 'Every day';
        else summary = `Every ${r.interval} days`;
    } else if (r.frequency === 'weekly') {
        if (r.interval === 1) summary = 'Every week';
        else summary = `Every ${r.interval} weeks`;
        
        if (r.weekdays && r.weekdays.length > 0) {
            summary += ` on ${r.weekdays.join(', ')}`;
        }
    } else if (r.frequency === 'monthly') {
        if (r.interval === 1) summary = 'Every month';
        else summary = `Every ${r.interval} months`;
        
        if (r.monthlyType === 'dayOfMonth' && r.dayOfMonth) {
            summary += ` on the ${getOrdinalNum(r.dayOfMonth)}`;
        } else if (r.monthlyType === 'weekdayPattern' && r.weekNumber && r.weekday) {
            summary += ` on the ${r.weekNumber.toLowerCase()} ${r.weekday}`;
        }
    } else if (r.frequency === 'yearly') {
        if (r.interval === 1) summary = 'Every year';
        else summary = `Every ${r.interval} years`;
        
        if (r.yearlyMonth && r.yearlyDay) {
            summary += ` on ${r.yearlyMonth} ${getOrdinalNum(r.yearlyDay)}`;
        }
    }
    
    if (r.endCondition === 'onDate' && r.until) {
        summary += `, until ${r.until}`;
    } else if (r.endCondition === 'afterCount' && r.count) {
        summary += `, ${r.count} times`;
    }
    
    return summary;
}
