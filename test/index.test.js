import React from "react";
import { mount } from "enzyme";

import Tenor from "../src";
import Result from "../src/result";
import testServer, { results } from "./test-server";

test("performs searches", async () => {
  testServer.listen(8080);

  let selected = null;
  const onSelect = result => { selected = result; };

  const component = mount(<Tenor token="token" onSelect={onSelect} />);
  component.find("input").simulate("change", { target: { value: "Happy" } });

  component.update();
  expect(component.state().search).toEqual("Happy");
  expect(component.find("svg")).toHaveLength(1);

  await component.instance().performSearch("Happy");

  component.update();
  expect(component.find(Result)).toHaveLength(results.length);

  testServer.close();
});
