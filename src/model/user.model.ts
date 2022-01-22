import { createUserId, UserId } from "./userId.value";

export interface User {
  readonly _tag: "User";
  readonly id: UserId;
  name: string;
}

export function createCustomer(name: string): User {
  const id = createUserId();
  return {
    _tag: "User",
    id,
    name,
  };
}
