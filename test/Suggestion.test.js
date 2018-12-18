import React from "react";
import { shallow } from "enzyme";

import Suggestion from "../src/Suggestion";

test("renders without crashing", () => {
  let selected = null;
  const onSuggestionClick = result => { selected = result; };

  const component = shallow(
    <Suggestion suggestion="test" onSuggestionClick={onSuggestionClick} />
  );

  expect(component.type()).toEqual("button");

  component.simulate("click");
  expect(selected).toEqual("test");
});
