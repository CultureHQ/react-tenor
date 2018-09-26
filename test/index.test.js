import React from "react";
import { mount } from "enzyme";

import Tenor from "../src";
import Result from "../src/result";
import withTestServer, { results } from "./test-server";

test("performs searches", () => (
  withTestServer(8080, async () => {
    let selected = null;
    const onSelect = result => { selected = result; };

    const component = mount(
      <Tenor base="http://localhost:8080" token="token" onSelect={onSelect} />
    );
    component.find("input").simulate("change", { target: { value: "Happy" } });

    component.update();
    expect(component.state().search).toEqual("Happy");
    expect(component.find("svg")).toHaveLength(1);

    await component.instance().performSearch("Happy");

    component.update();
    expect(component.find(Result)).toHaveLength(results.length);

    component.find(Result).at(3).simulate("click");
    expect(selected).toEqual(results[3]);
  })
));

test("handles the contentRef prop", () => {
  const contentRef = React.createRef();
  const component = mount(<Tenor token="token" contentRef={contentRef} />);

  expect(contentRef.current).not.toBe(null);
  component.unmount();
});
