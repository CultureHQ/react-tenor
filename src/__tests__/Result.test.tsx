import * as React from "react";
import { shallow } from "enzyme";

import * as TenorAPI from "../TenorAPI";
import Result from "../Result";
import { results } from "./withTestServer";

type OnLoadCallback = (event: Event) => void;

test("renders without crashing", () => {
  let selected: TenorAPI.Result | null = null;
  const onSelect = (result: TenorAPI.Result) => {
    selected = result;
  };

  const component = shallow<Result>(<Result result={results.search[0]} onSelect={onSelect} />);
  expect(component.type()).toEqual("button");

  component.simulate("click");
  expect(selected).toEqual(results.search[0]);
});

test("loads the image in the background", () => {
  const component = shallow<Result>(<Result result={results.search[0]} onSelect={jest.fn()} />);
  expect(component.find("span")).toHaveLength(0);

  const { image } = component.instance();
  (image.onload as OnLoadCallback)(new Event("onload"));

  component.update();
  expect(component.find("span")).toHaveLength(1);
});

test("does not attempt to set state if the image finishes after unmount", () => {
  const component = shallow<Result>(<Result result={results.search[0]} onSelect={jest.fn()} />);
  const { image } = component.instance();

  component.unmount();
  (image.onload as OnLoadCallback)(new Event("onload"));
});
