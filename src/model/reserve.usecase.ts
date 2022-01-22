import { getReserveFirebase } from "../firebase";
import { createCalender } from "./calender.value";
import { Reserve } from "./reserve.model";
import { createTime, Time } from "./time.value";

//予約情報取得
export async function getReserveUc(): Promise<Array<Reserve>> {
  let result: Array<Reserve> = [];
  await getReserveFirebase().then((data) => {
    result = data.map((v) => {
      let time: Time = createTime(v["data"].time);
      let calender = createCalender(
        v["data"].year,
        v["data"].month,
        v["data"].day,
        v["data"].weekDay
      );
      return {
        _tag: "Reserve",
        id: v["id"],
        userId: v["data"].userId,
        calender,
        time,
      };
    });
  });
  return result;
}
//doReserve
export function doReserveUc() {}

//infoReserve

//cancelReserve
