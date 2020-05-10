import React from "react";
import App from "./app";

import { shallow } from "enzyme";

describe("App", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
