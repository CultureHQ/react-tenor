import React, { Component } from "react";

import Client from "./client";

const DELAY = 250;

class Tenor extends Component {
  state = { results: [], search: "", searching: false };

  handleSearchChange = ({ target: { value: search } }) => {
    if (!search.length) {
      this.setState({ search, searching: false });
      return;
    }

    this.setState({ search, searching: true });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => this.performSearch(search), DELAY);
  };

  performSearch = query => {
    new Client(this.props.key).search(query).then(results => {
      this.setState({ results, searching: false });
    });
  };

  render() {
    const { results, search, searching } = this.state;

    return (
      <div>
        <input type="text" value={search} onChange={this.handleSearchChange} />
        {searching && "Searching..."}
        <br />
        {results.map(result => (
          <img key={result.id} src={result.media[0].tinygif.url} />
        ))}
      </div>
    );
  }
}

export default Tenor;
