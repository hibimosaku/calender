import { createUserId } from "./userId.value";

test("createUserId", () => {
  expect(createUserId()).toBe(5);
});
