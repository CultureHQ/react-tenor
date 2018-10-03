import React from "react";
import { mount } from "enzyme";

import Tenor from "../src";
import Result from "../src/result";
import withTestServer, { results } from "./test-server";

test("performs searches", () => (
  withTestServer(8081, async () => {
    let selected = null;
    const onSelect = result => { selected = result; };
    const search = "Happy";

    const component = mount(
      <Tenor base="http://localhost:8081" token="token" onSelect={onSelect} />
    );
    component.find("input").simulate("change", { target: { value: search } });

    component.update();
    expect(component.state().search).toEqual(search);
    expect(component.find("svg")).toHaveLength(1);

    await component.instance().performSearch(search);

    component.update();
    expect(component.find(Result)).toHaveLength(results.search.length);

    component.find(Result).at(3).simulate("click");
    expect(selected).toEqual(results.search[3]);

    component.unmount();
  })
));

test("dedups fast searches", () => (
  withTestServer(8082, server => {
    const component = mount(<Tenor base="http://localhost:8082" token="token" />);
    const search = "Happy";

    search.split("").forEach((_, index) => {
      const value = search.slice(0, index + 1);
      component.instance().handleSearchChange({ target: { value } });
    });

    return new Promise(resolve => {
      // Yeah this is not great, but if you're going to test setTimeout,
      // sometimes you just want to use setTimeout.
      setTimeout(() => {
        expect(server.requests.search).toEqual(1);

        resolve();
      }, 300);
    });
  })
));

test("does not enqueue searches for empty inputs", () => {
  const component = mount(<Tenor />);

  component.instance().handleSearchChange({ target: { value: "" } });

  expect(component.instance().timeout).toBe(undefined);
});

test("handles the contentRef prop", () => {
  const contentRef = React.createRef();
  const component = mount(<Tenor contentRef={contentRef} />);

  expect(contentRef.current).not.toBe(null);
  component.unmount();
});

test("allows you to call focus() on the parent", () => {
  const component = mount(<Tenor />);

  component.instance().focus();
  expect(document.activeElement.classList[0]).toEqual("react-tenor--search");
});

test("handles clicking a suggestion", () => (
  withTestServer(8083, async () => {
    const component = mount(<Tenor base="http://localhost:8083" token="token" />);

    component.setState({ search: "test" });
    await component.instance().fetchSuggestions("test");
    component.update();

    expect(component.find("Suggestion")).toHaveLength(5);

    component.find("Suggestion").at(2).find("button").simulate("click");
    expect(component.state().search).toEqual(results.search_suggestions[2]);

    await component.instance().performSearch(results.search_suggestions[2]);
  })
));

test("handles tab completing the typeahead", () => (
  withTestServer(8084, async () => {
    const component = mount(<Tenor base="http://localhost:8084" token="token" />);

    component.setState({ search: "t" });
    await component.instance().fetchAutocomplete("t");
    component.update();

    expect(component.find("Autocomplete")).toHaveLength(1);

    component.find("input").simulate("keyDown", { keyCode: 9 });
    expect(component.state().search).toEqual(results.autocomplete[0]);

    await component.instance().performSearch(results.autocomplete[0]);
  })
));
