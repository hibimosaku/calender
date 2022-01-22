//集約

import { Calender } from "./calender.value";
import { createReserveId, ReserveId } from "./reserveId.value";
import { Time, timeZone } from "./time.value";

export interface Reserve {
  readonly _tag: "Reserve";
  readonly id: ReserveId;
  readonly userId: string;
  readonly calender: Calender;
  readonly time: Time;
}

export function createReserve(
  userId: string,
  calender: Calender,
  time: Time
): Reserve {
  const id = createReserveId();

  return {
    _tag: "Reserve",
    id,
    userId,
    calender,
    time,
  };
}

const MAXRESERVE = 8;
const MINRESERVE = 0;
const infoEmpty: Array<string> = ["〇", "△", "×"];

export function findAllReserve(
  reserves: Array<Reserve>,
  year: number,
  month: number,
  day: number
): Array<Reserve> {
  return reserves.filter((v) => {
    return (
      v.calender.year === year &&
      v.calender.month === month &&
      v.calender.day === day
    );
  });
}

export function findUserReserve(
  reserves: Array<Reserve>,
  userId: string
): Array<Reserve> {
  return reserves.filter((v) => {
    return v.userId === userId;
  });
}

export function statusReserve(
  reserves: Array<Reserve>,
  year: number,
  month: number,
  day: number
): string | never {
  const result = findAllReserve(reserves, year, month, day);
  if (result.length < MINRESERVE || result.length > MAXRESERVE)
    throw new Error(`EMPTY should be ${MINRESERVE} to ${MAXRESERVE}`);
  if (result.length === MAXRESERVE) return infoEmpty[2];
  if (result.length >= 5 && result.length <= 7) return infoEmpty[1];
  if (result.length < 5) return infoEmpty[0];
  throw new Error();
}

export function reserveEmptyTime(
  reserves: Array<Reserve>,
  year: number,
  month: number,
  day: number
) {
  let baseTimeZone = [...timeZone];
  const dayOfReserve = findAllReserve(reserves, year, month, day);
  if (dayOfReserve.length === 0) return baseTimeZone;

  let s = new Set();
  baseTimeZone.forEach((v) => {
    s.add(v);
  });
  dayOfReserve.forEach((v) => {
    s.delete(v.time.raw);
  });
  const result = [...s];
  return result;
}

export function hasUserReserve(
  userReserves: Array<Reserve>,
  year: number,
  month: number,
  day: number
): string {
  const result = userReserves.filter((v) => {
    return (
      v.calender.year === year &&
      v.calender.month === month &&
      v.calender.day === day
    );
  });
  if (result.length > 0) {
    return "予約済";
  } else {
    return "";
  }
}
