import React from "react";
import Register from "./register";

import { shallow } from "enzyme";

describe("Register", () => {
  it("renders without crashing", () => {
    shallow(<Register />);
  });
});
