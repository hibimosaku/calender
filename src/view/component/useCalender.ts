import { onMounted, ref } from "vue";
import {
  Calender,
  createMonthDate,
  generateWeeksArray,
} from "../../model/calender.value";
import {
  calNextYearMonth,
  createYearMonth,
  YearMonth,
} from "../../model/date.value";

export function useCalender() {
  const dat = new Date();
  const year = dat.getFullYear();
  const month = dat.getMonth() + 1;

  const currentDay = ref<number>();
  const currentYearMonth = ref<YearMonth>();
  const nextYearMonth = ref<YearMonth>();
  const afterNextYearMonth = ref<YearMonth>();
  const selectDate = ref<YearMonth>();
  const displayCalender = ref<Array<Calender>>();

  const set = ref();

  currentYearMonth.value = createYearMonth(year, month);
  nextYearMonth.value = calNextYearMonth(
    currentYearMonth.value.year,
    currentYearMonth.value.month
  );
  afterNextYearMonth.value = calNextYearMonth(
    nextYearMonth.value.year,
    nextYearMonth.value.month
  );

  currentDay.value = dat.getDate();

  const currentCalender: Array<Calender> = createMonthDate(
    currentYearMonth.value["year"],
    currentYearMonth.value["month"]
  );

  const nextMonth = () => {
    if (!nextYearMonth.value) return;
    if (!afterNextYearMonth.value) return;

    //当月→翌月
    if (selectDate.value === currentYearMonth.value) {
      const nextCalender: Array<Calender> = createMonthDate(
        nextYearMonth.value["year"],
        nextYearMonth.value["month"]
      );
      displayCalender.value = generateWeeksArray(nextCalender);

      selectDate.value = nextYearMonth.value;
      return;
    }
    //当月→翌々月
    if (selectDate.value === nextYearMonth.value) {
      const afterNextCalender: Array<Calender> = createMonthDate(
        afterNextYearMonth.value["year"],
        afterNextYearMonth.value["month"]
      );
      displayCalender.value = generateWeeksArray(afterNextCalender);

      selectDate.value = afterNextYearMonth.value;
      return;
    }
  };

  const backMonth = () => {
    if (!nextYearMonth.value) return;
    if (!afterNextYearMonth.value) return;
    if (!currentYearMonth.value) return;

    //翌月→当月
    if (selectDate.value === nextYearMonth.value) {
      const currentCalender: Array<Calender> = createMonthDate(
        currentYearMonth.value["year"],
        currentYearMonth.value["month"]
      );
      displayCalender.value = generateWeeksArray(currentCalender);

      selectDate.value = currentYearMonth.value;
      return;
    }
    //翌々月→翌月
    if (selectDate.value === afterNextYearMonth.value) {
      const nextCalender: Array<Calender> = createMonthDate(
        nextYearMonth.value["year"],
        nextYearMonth.value["month"]
      );
      displayCalender.value = generateWeeksArray(nextCalender);

      selectDate.value = nextYearMonth.value;
      return;
    }
  };

  onMounted(() => {
    selectDate.value = currentYearMonth.value;
    displayCalender.value = generateWeeksArray(currentCalender);
  });

  return {
    nextMonth,
    currentDay,
    currentYearMonth,
    nextYearMonth,
    afterNextYearMonth,
    selectDate,
    displayCalender,
    backMonth,
  };
}
