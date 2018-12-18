import React from "react";
import { shallow } from "enzyme";

import Result from "../src/Result";
import { results } from "./withTestServer";

test("renders without crashing", () => {
  let selected = null;
  const onSelect = result => { selected = result; };

  const component = shallow(<Result result={results.search[0]} onSelect={onSelect} />);
  expect(component.type()).toEqual("button");

  component.simulate("click");
  expect(selected).toEqual(results.search[0]);
});

test("loads the image in the background", () => {
  const component = shallow(<Result result={results.search[0]} />);
  expect(component.find("span")).toHaveLength(0);

  component.instance().image.onload();
  component.update();

  expect(component.find("span")).toHaveLength(1);
});

test("does not attempt to set state if the image finishes after unmount", () => {
  const component = shallow(<Result result={results.search[0]} />);
  const { image } = component.instance();

  component.unmount();
  image.onload();
});
