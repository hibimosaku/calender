//週の日数
export interface DaysWeekDay {
  name: string;
  firstWeek: number;
  lastWeek: number;
}

const monday: DaysWeekDay = {
  name: "monday",
  firstWeek: 7,
  lastWeek: 1,
};
const tuesday: DaysWeekDay = {
  name: "tuesday",
  firstWeek: 6,
  lastWeek: 2,
};
const wednesday: DaysWeekDay = {
  name: "wednesday",
  firstWeek: 5,
  lastWeek: 3,
};
const thursday: DaysWeekDay = {
  name: "thursday",
  firstWeek: 4,
  lastWeek: 4,
};
const friday: DaysWeekDay = {
  name: "friday",
  firstWeek: 3,
  lastWeek: 5,
};
const saturday: DaysWeekDay = {
  name: "saturday",
  firstWeek: 2,
  lastWeek: 6,
};
const sunday: DaysWeekDay = {
  name: "sunday",
  firstWeek: 1,
  lastWeek: 7,
};

export const weekDays: Array<DaysWeekDay> = [
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
];

//曜日情報の取得
export function getWeekDay(weekDay: string) {
  const result = weekDays.filter((v) => {
    return v.name === weekDay;
  });
  return result;
}
