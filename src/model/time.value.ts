//時間

export interface Time {
  readonly _tag: "Time";
  readonly raw: number;
}

const MIN = 9;
const MAX = 17;
const NO = 12;

export function createTime(time: number): Time {
  if (time < MIN || time > MAX || time === NO)
    throw new Error(`time should be ${MIN} to ${MAX} or ${NO}`);
  return {
    _tag: "Time",
    raw: time,
  };
}
export const timeZone = [9, 10, 11, 13, 14, 15, 16, 17];
