import React from "react";
import Dashboard from "./dashboard";

import { shallow } from "enzyme";

describe("Dashboard", () => {
  it("renders without crashing", () => {
    shallow(<Dashboard location={{ pathname: "/" }} />);
  });
});
