import React from "react";
import Login from "./login";

import { shallow } from "enzyme";

describe("Login", () => {
  it("renders without crashing", () => {
    shallow(<Login />);
  });
});
