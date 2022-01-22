<template>
  <template v-if="hasUserReserveUi">
    <!-- 日付がない場合 -->
    <td
      v-if="
        (selectMonth === currentMonth && day <= currentDay) ||
        currentDay === null
      "
    >
      {{ day }}
    </td>
    <!-- 日付ありだが、予約がない場合 -->
    <td v-else-if="statusReserveUi(selectYear, selectMonth, day) === '×'">
      {{ day }}
      {{
        day !== null || (selectMonth === currentMonth && day > currentDay)
          ? statusReserveUi(selectYear, selectMonth, day)
          : null
      }}
    </td>
    <!-- 上記以外 -->
    <td
      v-else
      @click="showReserve(selectYear, selectMonth, day)"
      class="cursorDay"
    >
      {{ day }}
      {{
        day !== null || (selectMonth === currentMonth && day > currentDay)
          ? statusReserveUi(selectYear, selectMonth, day)
          : null
      }}
      {{ hasUserReserveUi(selectYear, selectMonth, day) }}
    </td>
  </template>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { Calender } from "../../model/calender.value";
import { YearMonth } from "../../model/date.value";
import {
  Reserve,
  statusReserve,
  hasUserReserve,
} from "../../model/reserve.model";

export default defineComponent({
  props: {
    day: Number as PropType<Calender["day"]>,
    currentDay: Number,
    selectYear: Number as PropType<YearMonth["year"]>,
    selectMonth: Number as PropType<YearMonth["month"]>,
    currentMonth: Number as PropType<YearMonth["month"]>,
    fetchReserves: Array as PropType<Array<Reserve>>,
    userReserves: Array as PropType<Array<Reserve>>,
    displayCalender: Array as PropType<Array<Calender>>,
  },
  emits: ["showReserve"],
  setup(props, { emit }) {
    const statusReserveUi = computed(() => {
      return (year: number, month: number, day: number) => {
        if (!props.fetchReserves) return;
        return statusReserve(props.fetchReserves, year, month, day);
      };
    });

    const hasUserReserveUi = computed(() => {
      return (year: number, month: number, day: number) => {
        if (!props.userReserves) return;
        return hasUserReserve(props.userReserves, year, month, day);
      };
    });

    const showReserve = (
      year: number,
      month: number,
      day: number,
      weekday: string
    ) => {
      emit("showReserve", year, month, day, weekday);
    };

    return {
      statusReserveUi,
      showReserve,
      hasUserReserveUi,
    };
  },
});
</script>
