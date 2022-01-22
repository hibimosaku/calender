import {
  generateWeeksArray,
  Calender,
  createMonthDate,
} from "./calender.value";

test("calender", () => {
  const one: Array<Calender> = createMonthDate(2022, 1);
  const two: Array<Calender> = createMonthDate(2022, 2);
  const three: Array<Calender> = createMonthDate(2022, 3);
  const allCalender = [...one, ...two, ...three];

  expect(generateWeeksArray(allCalender)).toEqual({
    undefined,
  });
});
