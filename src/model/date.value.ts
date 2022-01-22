//時間

export interface YearMonth {
  readonly _tag: "YearMonth";
  readonly year: number;
  readonly month: number;
}

const MINYEAR = 2022;
const MAXYEAR = 2999;
const MINMONTH = 1;
const MAXMONTH = 12;

export function createYearMonth(year: number, month: number): YearMonth {
  if (year < MINYEAR || year > MAXYEAR)
    throw new Error(`year should be ${MINYEAR} to ${MAXYEAR}`);
  if (month < MINMONTH || month > MAXMONTH)
    throw new Error(`month should be ${MINMONTH} to ${MAXMONTH}`);

  return {
    _tag: "YearMonth",
    year,
    month,
  };
}

export function calNextYearMonth(
  currentYear: number,
  currentMonth: number
): YearMonth {
  if (currentMonth === 3) {
    return {
      _tag: "YearMonth",
      year: currentYear + 1,
      month: 1,
    };
  } else {
    return {
      _tag: "YearMonth",
      year: currentYear,
      month: currentMonth + 1,
    };
  }
}

export function calBackYearMonth(
  currentYear: number,
  currentMonth: number
): YearMonth {
  if (currentMonth === 1) {
    return {
      _tag: "YearMonth",
      year: currentYear - 1,
      month: 12,
    };
  } else {
    return {
      _tag: "YearMonth",
      year: currentYear,
      month: currentMonth - 1,
    };
  }
}
