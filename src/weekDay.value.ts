//曜日情報
export interface WeekDay {
  readonly _tag: "WeekDay";
  readonly name:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  readonly ArrayNumfirstWeek: number;
  readonly ArrayNumlastWeek: number;
}

const arrayWeekDay = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function findWeekDay(year: number, month: number, day: number) {
  const dat = new Date(year, month - 1, day);
  return arrayWeekDay[dat.getDay()];
}

const monday: WeekDay = {
  _tag: "WeekDay",
  name: "monday",
  ArrayNumfirstWeek: 7,
  ArrayNumlastWeek: 1,
};
const tuesday: WeekDay = {
  _tag: "WeekDay",
  name: "tuesday",
  ArrayNumfirstWeek: 6,
  ArrayNumlastWeek: 2,
};
const wednesday: WeekDay = {
  _tag: "WeekDay",
  name: "wednesday",
  ArrayNumfirstWeek: 5,
  ArrayNumlastWeek: 3,
};
const thursday: WeekDay = {
  _tag: "WeekDay",
  name: "thursday",
  ArrayNumfirstWeek: 4,
  ArrayNumlastWeek: 4,
};
const friday: WeekDay = {
  _tag: "WeekDay",
  name: "friday",
  ArrayNumfirstWeek: 3,
  ArrayNumlastWeek: 5,
};
const saturday: WeekDay = {
  _tag: "WeekDay",
  name: "saturday",
  ArrayNumfirstWeek: 2,
  ArrayNumlastWeek: 6,
};
const sunday: WeekDay = {
  _tag: "WeekDay",
  name: "sunday",
  ArrayNumfirstWeek: 1,
  ArrayNumlastWeek: 7,
};

const weekDays: Array<WeekDay> = [
  monday,
  thursday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
];

export const Calender = {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  weekDays,
};
