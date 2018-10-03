import React, { Component } from "react";

import Client from "./client";
import Result from "./result";

const DELAY = 250;

const Search = ({
  contentRef, inputRef, onSearchChange, onSelect, results, search, searching
}) => (
  <div className="react-tenor" ref={contentRef}>
    <div className="react-tenor--search-bar">
      <input
        ref={inputRef}
        aria-label="Search"
        className="react-tenor--search"
        type="search"
        value={search}
        onChange={onSearchChange}
        placeholder="Search Tenor"
      />
      {searching && (
        <svg className="react-tenor--spinner" viewBox="0 0 1024 1024">
          <path d="M959.6 452.2c-2.8-17.4-6.2-34.6-10.6-51.6-5.6-21.6-12.8-43-21.6-63.6-17.8-42.4-42.2-82-71.8-117.2-32-37.8-70.6-70.4-113.4-95.4-42.2-24.8-88.2-42.4-136.2-52.2-24.8-5-49.8-8-75.2-8.2-19.8-0.2-39.6 0.6-59.2 2.4-51 5-101.4 19.2-147.8 41-39.8 18.8-76.8 43.2-109.6 72.4s-61.4 63.2-84.4 100.6c-25.4 41.6-44.4 87-54.8 134.6-8.4 38-12.4 77.2-10.4 116.2 1.8 37.8 7.6 75.6 19 111.8 7.2 23 15.8 45.4 26.6 67.2 10.6 21.4 23 42 36.8 61.4 27.6 38.6 61.2 72.8 99.6 101 39.2 29 83.4 51.4 129.8 66.2 48.4 15.4 99.8 22.6 150.6 20.8 49.6-1.6 98.8-11.2 145.2-29 44.6-17.2 86.4-41.8 123-72.6 18.4-15.6 34.8-33.2 50.2-51.8 15.6-18.8 29.6-38.6 41.2-60 10-18.4 18.4-37.6 25.6-57 3.6-9.6 7-19.2 9.8-29.2 3-10.6 5.2-21.6 7.2-32.4 3-17 4.2-34.6 2.6-51.8-1.4 7.6-2.6 15-4.4 22.4-2.2 8.6-5 17-8.2 25.2-6.4 17.4-14.4 34.2-22 51-9.8 21.4-21.2 41.8-33.6 61.6-6.4 10.2-13 20.2-20.2 29.8s-15.4 18.8-23.6 27.8-34.2 34.4-54 48.8c-20.2 14.8-41.6 27.8-64.2 38.6-45.2 22-94.6 35.2-144.6 39.6-51.2 4.4-103.4-0.6-152.6-15.2-46.8-13.8-91.2-36.2-130.2-65.6-37.8-28.6-70.6-63.8-96.4-103.6-27-40.6-45.6-86.4-55.8-134.2-2.6-12.4-4.6-25.2-6-37.8-1.2-10.8-2.2-21.8-2.6-32.8-0.6-22.6 0.8-46 4.2-68.4 7.4-49.2 23.4-96.6 48.2-139.8 22-38.6 50.6-73.4 84.2-102.8 33.6-29.6 72-53.4 113.6-70.2 24-9.8 49.2-17 74.8-21.8 13-2.4 26-4.4 39-5.4 6.4-0.6 12.6-0.6 19-1.2 2.6 0 5.2 0.2 7.8 0.2 43.4-0.8 87 4.8 128.4 17.8 44.6 14 86.6 36.6 123 66 38.2 30.8 70 68.8 94 111.6 20.4 36.4 35 75.6 43.8 116.4 2 9.4 3.6 18.8 5.2 28.2 1.4 8.6 6.2 16.6 13.6 21.4 15.6 10.4 37.4 3.4 45-13.4 2.6-5.8 3.4-12 2.4-17.8z" />
        </svg>
      )}
    </div>
    <div className="react-tenor--results">
      {results.map(result => (
        <Result key={result.id} result={result} onSelect={onSelect} />
      ))}
    </div>
  </div>
);

class Tenor extends Component {
  inputRef = React.createRef();

  state = { results: [], search: "", searching: false };

  componentDidMount() {
    this.componentIsMounted = true;
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  handleSearchChange = ({ target: { value: search } }) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (!search.length) {
      this.setState({ results: [], search, searching: false });
      return;
    }

    this.setState({ search, searching: true });
    this.timeout = setTimeout(() => this.performSearch(search), DELAY);
  };

  performSearch = query => {
    if (!this.componentIsMounted) {
      return Promise.resolve();
    }

    const { base, token } = this.props;

    return new Client({ base, token }).search(query).then(results => {
      this.setState({ results, searching: false });
    });
  };

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    const { contentRef, onSelect } = this.props;
    const { results, search, searching } = this.state;

    return (
      <Search
        contentRef={contentRef}
        inputRef={this.inputRef}
        onSearchChange={this.handleSearchChange}
        onSelect={onSelect}
        results={results}
        search={search}
        searching={searching}
      />
    );
  }
}

export default Tenor;
