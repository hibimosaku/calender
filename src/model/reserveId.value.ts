//vo
export interface ReserveId {
  _tag: "ReserveId";
  raw: string;
}

export function createReserveId(): ReserveId {
  const now = new Date();
  const year = String(now.getFullYear()).slice(2, 4);
  const month =
    String(now.getMonth()).length === 1
      ? `0${now.getMonth() + 1}`
      : now.getMonth() + 1;
  const day =
    String(now.getDate()).length === 1 ? `0${now.getDate()}` : now.getDate();
  const hour =
    String(now.getHours()).length === 1 ? `0${now.getHours()}` : now.getHours();
  const random = String(Math.random()).split(".")[1].slice(0, 3);

  return {
    _tag: "ReserveId",
    raw: "r" + (year + month + day + hour + random),
  };
}
