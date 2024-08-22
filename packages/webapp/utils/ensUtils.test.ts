import { isValidName } from "./ensUtils";

describe("ensUtils", () => {
  test.each(["dev.volky.eth", "volky.eth", "gnars.com"])("recognized valid ens name %s", (name) =>
    expect(isValidName(name)).toBe(true)
  );
  test.each(["volky", "gnars.com."])("recognized invalid ens name %s", (name) => expect(isValidName(name)).toBe(false));
});
