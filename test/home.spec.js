import { signIn } from '../src/Pages/Home/home.js';


describe("SignIn", () => {
  it("should be a function", () => {
    expect(typeof signIn).toBe("function");
  });
});