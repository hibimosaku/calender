<template>
  <div>
    <navContainer></navContainer>
  </div>
  <div style="margin: 40px 0px">
    <h3>カレンダー</h3>
    <div
      class="d-flex justify-content-between"
      style="margin: 15px 0px"
      v-if="selectDate"
    >
      <div @click="backMonth" style="cursor: pointer">
        {{
          selectDate === nextYearMonth || selectDate === afterNextYearMonth
            ? "前月"
            : "　　"
        }}
      </div>
      <div>{{ selectDate["year"] }}年 : {{ selectDate["month"] }}月</div>
      <div @click="nextMonth" style="cursor: pointer">
        {{
          selectDate === currentYearMonth || selectDate === nextYearMonth
            ? "翌月"
            : "　　"
        }}
      </div>
    </div>
    <div>
      <table class="table" v-if="displayCalender && userReserves">
        <thead>
          <tr>
            <th scope="col">月曜日</th>
            <th scope="col">火曜日</th>
            <th scope="col">水曜日</th>
            <th scope="col">木曜日</th>
            <th scope="col">金曜日</th>
            <th scope="col">土曜日</th>
            <th scope="col">日曜日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in displayCalender" :key="day">
            <template v-for="n in 7" :key="n">
              <weekdayComponent
                :day="day[n - 1]"
                :displayCalender="displayCalender"
                :currentDay="currentDay"
                :selectYear="selectDate['year']"
                :selectMonth="selectDate['month']"
                :currentMonth="currentYearMonth['month']"
                :fetchReserves="fetchReserves"
                :userReserves="userReserves"
                @showReserve="showReserve"
                v-if="userReserves"
              ></weekdayComponent>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="displayReserve" style="margin: 40px 0px">
    <h5>予約登録</h5>
    <div style="text-align: right">
      <button
        type="button"
        class="btn-close"
        @click="displayReserve = false"
      ></button>
    </div>
    <p>予約日{{ selectDate["month"] }}月{{ selectReserve }}日</p>
    <p>予約時間</p>
    <select class="form-select form-select mb-3" v-model="reserveTime">
      <option v-for="time in emptyReserve" :key="time" :value="time">
        {{ time }}～{{ time + 1 }}時
      </option>
    </select>
    <button
      type="button"
      class="btn btn-primary"
      @click="doReserve(selectDate['year'], selectDate['month'], selectReserve)"
    >
      予約する
    </button>
  </div>
  <div style="margin: 40px 0px">
    <h5>予約一覧</h5>
    <table class="table" v-if="userReserves">
      <thead>
        <tr>
          <th scope="col">年</th>
          <th scope="col">月</th>
          <th scope="col">日</th>
          <th scope="col">曜日</th>
          <th scope="col">時間帯</th>
          <th scope="col">削除実行</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in userReserves" :key="data">
          <td>{{ data.calender.year }}</td>
          <td>{{ data.calender.month }}</td>
          <td>{{ data.calender.day }}</td>
          <td>{{ data.calender.weekDay }}</td>
          <td>{{ data.time.raw }}～{{ Number(data.time.raw) + 1 }}</td>
          <td style="cursor: pointer" @click="cancelReserve(data.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import weekdayComponent from "./component/weekday.component.vue";
import { useReserve } from "./component/useReserve";
import { useCalender } from "./component/useCalender";
import navContainer from "./component/nav.container.vue";

export default {
  // beforeRouteLeave (to, from) {
  //   const answer = window.confirm('編集中のデータは保存されませんがよろしいでしょうか')
  //   if (!answer) return false
  // },
  components: { weekdayComponent, navContainer },
  setup() {
    // })
    // window.onbeforeunload = function (e) {
    //   e.returnValue = "ページを離れようとしています。よろしいですか？";
    // };

    //カレンダー機能
    const {
      nextMonth,
      currentDay,
      currentYearMonth,
      nextYearMonth,
      afterNextYearMonth,
      selectDate,
      displayCalender,
      backMonth,
    } = useCalender();

    //予約機能
    const {
      fetchReserves,
      selectReserve,
      emptyReserve,
      displayReserve,
      showReserve,
      doReserve,
      reserveTime,
      cancelReserve,
      userId,
      userReserves,
    } = useReserve();

    return {
      displayCalender,
      nextMonth,
      displayReserve,
      showReserve,
      selectReserve,
      reserveTime,
      doReserve,
      fetchReserves,
      cancelReserve,
      backMonth,
      currentDay,
      emptyReserve,
      selectDate,
      nextYearMonth,
      afterNextYearMonth,
      currentYearMonth,
      userId,
      userReserves,
    };
  },
};
</script>
<style lang="scss">
.cursorDay {
  cursor: pointer;
  text-decoration: underline;
}
</style>
