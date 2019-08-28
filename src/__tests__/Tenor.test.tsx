import * as React from "react";
import { mount, ReactWrapper } from "enzyme";

import * as TenorAPI from "../TenorAPI";
import Tenor, { defaultState } from "../Tenor";
import Result from "../Result";
import withTestServer, { TestServer, results } from "./withTestServer";

const ARROW_LEFT_KEY = 37;
const ARROW_RIGHT_KEY = 39;

type TenorProps = React.ComponentProps<typeof Tenor>;
type TenorState = Tenor["state"];

type MountedTenor = ReactWrapper<TenorProps, TenorState, Tenor> & {
  pressKey: (keyCode: number) => void;
  pressArrowLeftKey: () => void;
  pressArrowRightKey: () => void;
};

type MountedTenorProps = Partial<Pick<TenorProps, keyof TenorProps>>;
type MountedTenorState = Partial<Pick<TenorState, keyof TenorState>>;

const mountTenor = (props: MountedTenorProps = {}, state: MountedTenorState = {}): MountedTenor => {
  const component = mount<Tenor>(
    <Tenor
      base={props.base}
      contentRef={props.contentRef}
      initialSearch={props.initialSearch}
      onSelect={props.onSelect || jest.fn()}
      token={props.token || "token"}
    />
  ) as MountedTenor;

  component.setState({ ...defaultState, ...state });

  component.pressKey = keyCode => {
    component.instance().handleWindowKeyDown({
      ...new KeyboardEvent("keydown"),
      keyCode,
      metaKey: true,
      target: component.instance().contentRef.current,
      preventDefault: () => {}
    });
  };

  component.pressArrowLeftKey = () => component.pressKey(ARROW_LEFT_KEY);
  component.pressArrowRightKey = () => component.pressKey(ARROW_RIGHT_KEY);

  return component;
};

test("performs searches", withTestServer(8081, async () => {
  let selected: TenorAPI.Result | null = null;
  const onSelect = (result: TenorAPI.Result) => {
    selected = result;
  };

  const search = "Happy";
  const component = mountTenor({ base: "http://localhost:8081", onSelect });
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
}));

test("dedups fast searches", withTestServer(8082, (server: TestServer) => {
  const component = mountTenor({ base: "http://localhost:8082" });

  const search = "Happy";
  search.split("").forEach((_, index) => {
    const value = search.slice(0, index + 1);
    component.find("input").simulate("change", { target: { value } });
  });

  return new Promise(resolve => {
    // Yeah this is not great, but if you're going to test setTimeout,
    // sometimes you just want to use setTimeout.
    setTimeout(() => {
      expect(server.requests.search).toEqual(1);

      resolve();
    }, 300);
  });
}));

test("allows passing an initialSearch prop", withTestServer(8083, async () => {
  const component = mountTenor({ base: "http://localhost:8083", initialSearch: "happy" });

  await component.instance().performSearch("");
  component.update();

  expect(component.find(Result)).toHaveLength(results.search.length);
}));

test("does not enqueue searches for empty inputs", () => {
  const component = mountTenor();

  component.find("input").simulate("change", { target: { value: "" } });

  expect(component.instance().timeout).toBe(null);
});

test("handles the contentRef prop", () => {
  const contentRef = React.createRef<HTMLDivElement>();
  const component = mountTenor({ contentRef });

  expect(contentRef.current).not.toBe(null);
  component.unmount();
});

test("allows you to call focus() on the parent", () => {
  const component = mountTenor();

  component.instance().focus();

  const { activeElement } = document;

  expect(activeElement).toBeTruthy();
  expect((activeElement as HTMLElement).classList[0]).toEqual("react-tenor--search");
});

describe("suggestions", () => {
  test("handles clicking a suggestion", withTestServer(8083, async () => {
    const component = mountTenor({ base: "http://localhost:8083" });

    component.setState({ search: "test" });
    await component.instance().fetchSuggestions("test");
    component.update();

    expect(component.find("Suggestion")).toHaveLength(5);

    component.find("Suggestion").at(2).find("button").simulate("click");

    expect(component.state().search).toEqual(results.search_suggestions[2]);
    await component.instance().performSearch(results.search_suggestions[2]);
  }));

  test("clears the timeout", () => {
    const component = mountTenor();
    component.setState({ search: "t", suggestions: ["test"] });

    component.instance().client.search = () => Promise.resolve({ results: results.search });
    component.instance().timeout = setTimeout(() => {}, 1000);

    component.find("Suggestion").find("button").simulate("click");
    expect(component.state().search).toEqual("test");
  });
});

describe("tab completion", () => {
  const BACKSPACE_KEY = 8;
  const TAB_KEY = 9;

  test("handles tab completing the typeahead", withTestServer(8084, async () => {
    const component = mountTenor({ base: "http://localhost:8084" });

    component.setState({ search: "t" });
    await component.instance().fetchAutoComplete("t");
    component.update();

    expect(component.find("AutoComplete")).toHaveLength(1);

    component.find("input").simulate("keyDown", { keyCode: TAB_KEY });
    expect(component.state().search).toEqual(results.autocomplete[0]);

    await component.instance().performSearch(results.autocomplete[0]);
  }));

  test("ignores other key inputs", () => {
    const component = mountTenor();

    component.find("input").simulate("keyDown", { keyCode: BACKSPACE_KEY });
    expect(component.state().search).toEqual("");
  });

  test("ignores when the autoComplete matches the search", () => {
    const component = mountTenor();
    component.setState({ autoComplete: "test", search: "test" });

    component.find("input").simulate("keyDown", { keyCode: TAB_KEY });
    expect(component.state().search).toEqual("test");
  });
});

describe("auto close", () => {
  test("handles clicking outside the component", () => {
    const contentRef = React.createRef<HTMLDivElement>();
    const component = mountTenor({ contentRef });

    component.instance().handleWindowClick(new MouseEvent("click"));
    expect(component.state().search).toEqual("");

    component.setState({ search: "t" });
    component.instance().handleWindowClick({ ...new MouseEvent("click"), target: contentRef.current });
    expect(component.state().search).toEqual("t");

    component.instance().handleWindowClick(new MouseEvent("click"));
    expect(component.state().search).toEqual("");
  });

  test("clears the timeout", () => {
    const component = mountTenor();
    component.setState({ search: "t" });

    component.instance().timeout = setTimeout(() => {}, 1000);
    component.instance().handleWindowClick(new MouseEvent("click"));
    expect(component.state().search).toEqual("");
  });
});

test("creates a new client when the token or base changes", () => {
  const component = mountTenor({ base: "https://example.com" });

  component.setProps({ token: "other-token" });
  expect(component.instance().client.token).toEqual("other-token");

  component.setProps({ base: "https://other-example.com" });
  expect(component.instance().client.base).toEqual("https://other-example.com");
});

test("handles when the search returns an error", () => {
  const component = mountTenor();
  component.instance().client.search = () => Promise.reject(new Error("error"));

  component.instance().performSearch("test");
  expect(component.state().searching).toBe(false);
});

test("unmounts cleanly", async () => {
  const component = mountTenor();
  const instance = component.instance();

  setTimeout(() => instance.mountedSetState({ search: "foobar" }), 100);
  component.unmount();

  await new Promise(resolve => setTimeout(resolve, 100));
});

describe("pagination", () => { /* eslint-disable @typescript-eslint/no-empty-function */
  test("paging left", () => {
    const component = mountTenor();
    expect(component.state().page).toEqual(0);

    component.instance().handlePageLeft();
    expect(component.state().page).toEqual(0);

    component.setState({ page: 1 });
    component.instance().handlePageLeft();
    expect(component.state().page).toEqual(0);
  });

  test("paging left with the keys", () => {
    const component = mountTenor({}, { page: 1 });

    component.pressArrowLeftKey();

    expect(component.state().page).toEqual(0);
  });

  test("paging right when not at the end", () => {
    const component = mountTenor({}, {
      page: 0,
      pages: [
        { results: results.search, next: "12" },
        { results: results.search, next: "24" }
      ],
      search: "test",
      searching: false
    });

    component.instance().handlePageRight();
    expect(component.state().page).toEqual(1);
  });

  test("paging right when at the end", withTestServer(8085, async () => {
    const component = mountTenor({ base: "http://localhost:8085", token: "token" }, {
      search: "test"
    });

    await component.instance().performSearch("test");
    component.update();

    await component.instance().handlePageRight();
    expect(component.state().page).toEqual(1);
  }));

  test("paging right with the keys", () => {
    const component = mountTenor({}, {
      page: 0,
      pages: [
        { results: results.search, next: "12" },
        { results: results.search, next: "24" }
      ],
      search: "test",
      searching: false
    });

    component.pressArrowRightKey();

    expect(component.state().page).toEqual(1);
  });

  test("ignores other key presses", () => {
    const component = mountTenor({}, { page: 1 });

    component.instance().handleWindowKeyDown({
      ...new KeyboardEvent("keydown"),
      keyCode: ARROW_LEFT_KEY,
      metaKey: true,
      target: document.body,
      preventDefault() {}
    });

    expect(component.state().page).toEqual(1);
  });

  test("does not page right if currently searching", () => {
    const component = mountTenor({}, {
      page: 0,
      pages: [
        { results: results.search, next: "12" },
        { results: results.search, next: "24" }
      ],
      search: "test",
      searching: true
    });

    component.pressArrowRightKey();

    expect(component.state().page).toEqual(0);
  });

  test("resets the searching state if the pagination call fails", () => {
    const component = mountTenor({}, {
      page: 0,
      pages: [{ results: results.search, next: "12" }],
      search: "test",
      searching: false
    });

    component.instance().client.search = () => Promise.reject(new Error("error"));
    component.pressArrowRightKey();

    expect(component.state().page).toEqual(0);
    expect(component.state().searching).toBe(false);
  });

  test("does not increment page if the next page has no results", () => {
    const component = mountTenor({}, {
      page: 0,
      pages: [{ results: results.search, next: "12" }],
      search: "test",
      searching: false
    });

    component.instance().client.search = () => Promise.resolve({ results: [] });
    component.pressArrowRightKey();

    expect(component.state().page).toEqual(0);
    expect(component.state().searching).toBe(false);
  });
});
