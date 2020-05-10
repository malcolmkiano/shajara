import React from "react";
import AuthForm from "./auth-form";

import { shallow } from "enzyme";

describe("AuthForm", () => {
  // set up default fields
  const fields = [
    {
      label: "Test Field",
      id: "testfield",
      value: "",
      type: "text",
      required: true,
      error: null,
    },
  ];

  it("renders without crashing", () => {
    const wrapper = shallow(
      <AuthForm
        title="Test Form"
        description="This is just a test"
        fields={fields}
      />
    );
    expect(wrapper.find("Input")).toHaveLength(1);
  });
});
