import { getWeekDay, weekDays } from "./weekDay.value";

//カレンダー
export interface Calender {
  readonly _tag: "Calender";
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly weekDay:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
}

const MINYEAR = 2022;
const MAXYEAR = 2999;
const MINMONTH = 1;
const MAXMONTH = 12;
const MINDAY = 1;
const MAXDAY = 31;

export function createCalender(
  year: number,
  month: number,
  day: number,
  weekDay: Calender["weekDay"]
): Calender {
  if (year < MINYEAR || year > MAXYEAR)
    throw new Error(`year should be ${MINYEAR} to ${MAXYEAR}`);
  if (month < MINMONTH || month > MAXMONTH)
    throw new Error(`month should be ${MINMONTH} to ${MAXMONTH}`);
  if (day < MINDAY || day > MAXDAY)
    throw new Error(`day should be ${MINDAY} to ${MAXDAY}`);

  return {
    _tag: "Calender",
    year,
    month,
    day,
    weekDay,
  };
}

//1ヶ月分作成
export function createMonthDate(year: number, month: number): Array<Calender> {
  const dat = new Date(year, month);
  const calenders = [];
  dat.setDate(0);
  const monthlastDate = dat.getDate();
  dat.setDate(1);
  for (let i = 1; i <= monthlastDate; i++) {
    dat.setDate(i);
    let calender: Calender = {
      _tag: "Calender",
      year: dat.getFullYear(),
      month: dat.getMonth() + 1,
      day: dat.getDate(),
      weekDay: weekDays[dat.getDay()].name as Calender["weekDay"],
    };
    calenders.push(calender);
  }
  return calenders;
}

//1年分作成→Calender[][]になっているから失敗
// export function createYearDate(year: number) {
//   const month = [1, 2, 3];
//   let calenders: Calender[][] = [];
//   month.forEach((v) => {
//     calenders.push(createMonthDate(year, v));
//   });
//   return calenders;
// }

// export const alls = createYearDate(2022);

// const one: Array<Calender> = createMonthDate(2022, 1);
// const two: Array<Calender> = createMonthDate(2022, 2);
// const three: Array<Calender> = createMonthDate(2022, 3);

// export const allCalender = [...one, ...two, ...three];

//月の週ごとに日にちを配列
export function generateWeeksArray(monthCalender: Array<Calender>) {
  let dataMonth: Array<number> = [];

  monthCalender.forEach((v: Calender) => {
    dataMonth.push(v.day);
  });

  const infoFirstWeekday = getWeekDay(monthCalender[0].weekDay);

  const infoLastWeekday = getWeekDay(
    monthCalender[monthCalender.length - 1].weekDay
  );

  let oneWeek: Array<number> = [];
  let twoWeek: Array<number> = [];
  let threeWeek: Array<number> = [];
  let fourWeek: Array<number> = [];
  let fiveWeek: Array<number> = [];
  let sixWeek: Array<number> = [];

  let arrayWeek: any = [];

  let splicedataMonth: Array<number> = dataMonth;

  //週の数は4～6
  for (let i = 1; i <= 6; i++) {
    if (i === 1) {
      let dayEmpty: any = [];
      let day: Array<number> = [];
      day = splicedataMonth.splice(0, infoFirstWeekday[0].firstWeek);
      dayEmpty = [...Array(7 - infoFirstWeekday[0].firstWeek)].map(() => null);
      oneWeek = dayEmpty.concat(day);
      arrayWeek.push(oneWeek);
    }

    if (i === 2) {
      twoWeek = splicedataMonth.splice(0, 7);
      arrayWeek.push(twoWeek);
    }

    if (i === 3) {
      threeWeek = splicedataMonth.splice(0, 7);
      arrayWeek.push(threeWeek);
    }

    if (i === 4 && splicedataMonth.length > 7) {
      fourWeek = splicedataMonth.splice(0, 7);
      arrayWeek.push(fourWeek);
    } else if (i === 4 && splicedataMonth.length <= 7) {
      fourWeek = splicedataMonth.splice(0, 7);
      arrayWeek.push(fourWeek);
      break;
    }

    if (i === 5 && splicedataMonth.length > 7) {
      fiveWeek = splicedataMonth.splice(0, 7);
      arrayWeek.push(fiveWeek);
    } else if (i === 5 && splicedataMonth.length === 7) {
      fiveWeek = splicedataMonth.splice(0, 7);
      arrayWeek.push(fiveWeek);
      break;
    } else if (i === 5 && splicedataMonth.length < 7) {
      let dayEmpty: any = [];
      let day: any = [];
      day = splicedataMonth.splice(0, splicedataMonth.length);
      dayEmpty = [...Array(7 - infoLastWeekday[0].lastWeek)].map(() => null);

      fiveWeek = day.concat(dayEmpty);
      arrayWeek.push(fiveWeek);
      break;
    } else if (i === 5 && splicedataMonth.length === 0) {
      break;
    }

    if (i === 6 && splicedataMonth.length >= 7) {
      sixWeek = splicedataMonth.splice(0, 7);
      arrayWeek.push(sixWeek);
    } else if (i === 6 && splicedataMonth.length < 7) {
      let dayEmpty: any = [];
      let day: any = [];
      day = splicedataMonth.splice(0, splicedataMonth.length);
      dayEmpty = [...Array(7 - infoLastWeekday[0].lastWeek)].map(() => null);
      sixWeek = day.concat(dayEmpty);
      arrayWeek.push(sixWeek);
    }
  }
  return arrayWeek;
}
