import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted, ref } from "vue";
import { createReserveFirebase, deleteReserveFirebase } from "../../firebase";
import { Calender, createCalender } from "../../model/calender.value";
import {
  createReserve,
  findUserReserve,
  Reserve,
  reserveEmptyTime,
} from "../../model/reserve.model";
import { getReserveUc } from "../../model/reserve.usecase";
import router from "../../router/router";
import { findWeekDay } from "../../weekDay.value";
// import router from "../../router/router";

export const useReserve = () => {
  const fetchReserves = ref<Array<Reserve>>();
  const selectReserve = ref();
  const emptyReserve = ref();
  const displayReserve = ref<boolean>(false);
  const currentWeekDay = ref<string>();
  const reserveTime = ref();
  const userId = ref();
  const userReserves = ref();

  const getReserve = (): void => {
    getReserveUc().then((v) => {
      fetchReserves.value = v;
      userReserves.value = findUserReserve(fetchReserves.value, userId.value);
    });
  };

  const doReserve = (year: number, month: number, day: number) => {
    const weekDay = findWeekDay(year, month, day);
    const calender = createCalender(
      year,
      month,
      day,
      weekDay as Calender["weekDay"]
    );
    const infoReserve = createReserve(
      userId.value,
      calender,
      reserveTime.value
    );
    createReserveFirebase(userId.value, infoReserve)
      .then(() => {
        reserveTime.value = "";
        getReserve();
        displayReserve.value = false;
      })
      .catch((e) => {
        alert("失敗しました");
      });
  };

  const showReserve = (year: number, month: number, day: number) => {
    displayReserve.value = true;
    selectReserve.value = day;
    if (!fetchReserves.value) return;
    const time = reserveEmptyTime(fetchReserves.value, year, month, day);
    if (time.length === 0) {
      emptyReserve.value = ["予約の空きがありません"];
      return emptyReserve.value;
    } else {
      emptyReserve.value = time;
      return emptyReserve.value;
    }
  };

  const cancelReserve = (id: string) => {
    console.log(id);
    deleteReserveFirebase(id)
      .then(() => {
        getReserve();
      })
      .catch(() => {
        alert("失敗");
      });
  };

  onMounted(() => {
    getReserve();
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        userId.value = user.uid;
      } else {
        router.push("/");
      }
    });
  });

  return {
    fetchReserves,
    selectReserve,
    emptyReserve,
    displayReserve,
    currentWeekDay,
    doReserve,
    showReserve,
    cancelReserve,
    reserveTime,
    getReserve,
    userId,
    userReserves,
  };
};
