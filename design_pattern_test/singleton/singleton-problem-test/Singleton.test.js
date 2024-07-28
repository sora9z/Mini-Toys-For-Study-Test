const { Singleton } = require("./Singleton");

describe("Singleton Pattern test", () => {
  it("should get initialize valut to 0", () => {
    const instance = Singleton.getInstance();
    expect(instance.getValue()).toBe(0);
  });

  it("should set value to 1 and get value 1", () => {
    const instance = Singleton.getInstance();
    instance.setValue(1);
    expect(instance.getValue()).toBe(1);
  });

  it("should maintain the same value acroos tests (This is problematic)", () => {
    const instance = Singleton.getInstance();
    expect(instance.getValue()).toBe(1);
  });
});
