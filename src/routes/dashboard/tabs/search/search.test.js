import React from "react";
import Search from "./search";

import { shallow } from "enzyme";

describe("Search", () => {
  it("renders without crashing", () => {
    shallow(<Search />);
  });
});
