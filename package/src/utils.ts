import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  isSameDay,
  isWithinInterval,
  isSameMonth,
  addMonths,
  isValid,
  min,
  max,
  parseISO,
  toDate,
} from 'date-fns';

import { DateRange } from './types';

export const identity = <T>(x: T) => x;

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_v, i) =>
    array.slice(i * size, i * size + size)
  );

export const combine = (...args: any[]): string =>
  args.filter(identity).join(' ');

// Date
export const getDaysInMonth = (date: Date) => {
  const startWeek = startOfWeek(startOfMonth(date));
  const endWeek = endOfWeek(endOfMonth(date));
  const days = [];
  for (let curr = startWeek; isBefore(curr, endWeek); null) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

export const isStartOfRange = ({ startDate }: DateRange, day: Date) =>
  startDate && (isSameDay(day, startDate) as boolean);

export const isEndOfRange = ({ endDate }: DateRange, day: Date) =>
  (endDate && isSameDay(day, endDate)) as boolean;

export const inDateRange = ({ startDate, endDate }: DateRange, day: Date) =>
  (startDate &&
    endDate &&
    (isWithinInterval(day, { start: startDate, end: endDate }) ||
      isSameDay(day, startDate) ||
      isSameDay(day, endDate))) as boolean;

export const isRangeSameDay = ({ startDate, endDate }: DateRange) => {
  if (startDate && endDate) {
    return isSameDay(startDate, endDate);
  }
  return false;
};

type Falsy = false | null | undefined | 0 | '';

export const parseOptionalDate = (
  date: Date | string | Falsy,
  defaultValue: Date
) => {
  if (date) {
    let parsed: Date;
    if (typeof date === 'string') parsed = parseISO(date);
    else parsed = toDate(date);
    if (isValid(parsed)) return parsed;
  }
  return defaultValue;
};

export const getValidatedMonths = (
  range: DateRange,
  minDate: Date,
  maxDate: Date
) => {
  const { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ];
  }
  return [startDate, endDate];
};
