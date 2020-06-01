import * as React from "react";
import { shallow } from "enzyme";

import Result from "../Result";
import mockResults from "./mockResults";

const result = mockResults.search[0];
type OnLoadCallback = (event: Event) => void;

test("renders without crashing", () => {
  const onSelect = jest.fn();
  const component = shallow<Result>(<Result result={result} onSelect={onSelect} />);

  expect(component.type()).toEqual("button");

  component.simulate("click");
  expect(onSelect).toHaveBeenCalledWith(result);
});

test("loads the image in the background", () => {
  const component = shallow<Result>(<Result result={result} onSelect={jest.fn()} />);
  expect(component.find("span")).toHaveLength(0);

  const { image } = component.instance();
  (image.onload as OnLoadCallback)(new Event("onload"));

  component.update();
  expect(component.find("span")).toHaveLength(1);
});

test("does not attempt to set state if the image finishes after unmount", () => {
  const component = shallow<Result>(<Result result={result} onSelect={jest.fn()} />);
  const { image } = component.instance();

  component.unmount();
  (image.onload as OnLoadCallback)(new Event("onload"));
});
