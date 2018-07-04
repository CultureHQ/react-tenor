import React from "react";
import { shallow } from "enzyme";

import Result from "../src/result";

test("renders without crashing", async () => {
  const result = {
    media: [{
      tinygif: { url: "https://via.placeholder.com/350x150" }
    }]
  };

  let selected = false;
  const onSelect = () => selected = true;

  const component = shallow(<Result result={result} onSelect={onSelect} />);
  expect(component.type()).toEqual("button");

  component.simulate("click");
  expect(selected).toBe(true);
});
