import React, { Component } from "react";

import Client from "./client";
import Search from "./search";

const DEFAULT_STATE = {
  autocomplete: null,
  results: [],
  search: "",
  searching: false,
  suggestions: []
};

const DELAY = 250;

const TAB_KEY = 9;

class Tenor extends Component {
  constructor(props) {
    super(props);

    const { base, token } = props;
    this.client = new Client({ base, token });

    this.contentRef = React.createRef();
    this.inputRef = React.createRef();

    this.state = DEFAULT_STATE;
  }

  componentDidMount() {
    this.componentIsMounted = true;
    window.addEventListener("click", this.handleWindowClick);
  }

  componentDidUpdate(prevProps) {
    const { base, token } = this.props;

    if (base !== prevProps.base || token !== prevProps.token) {
      this.client = new Client({ base, token });
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
    window.removeEventListener("click", this.handleWindowClick);
  }

  fetchAutocomplete = currentSearch => {
    return this.client.autocomplete(currentSearch).then(autocomplete => {
      const { search } = this.state;

      if (this.componentIsMounted && search === currentSearch) {
        this.setState({ autocomplete });
      }
    });
  };

  fetchSuggestions = currentSearch => {
    return this.client.suggestions(currentSearch).then(suggestions => {
      const { search } = this.state;

      if (this.componentIsMounted && search === currentSearch) {
        this.setState({ suggestions });
      }
    });
  };

  handleWindowClick = event => {
    const { contentRef } = this.props;
    const { search } = this.state;

    if (!search) {
      return;
    }

    const content = (contentRef || this.contentRef).current;

    if (container.contains(event.target)) {
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState(DEFAULT_STATE);
  };

  handleSearchChange = ({ target: { value: search } }) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (!search.length) {
      this.setState(DEFAULT_STATE);
      return;
    }

    this.setState({ autocomplete: null, search, searching: true });
    this.fetchAutocomplete(search);
    this.fetchSuggestions(search);
    this.timeout = setTimeout(() => this.performSearch(search), DELAY);
  };

  handleSearchKeyDown = event => {
    const { autocomplete, search: prevSearch } = this.state;

    if (event.keyCode !== TAB_KEY || !autocomplete || !prevSearch) {
      return;
    }

    const lowerAutocomplete = autocomplete.toLowerCase();
    const lowerSearch = prevSearch.toLowerCase().replace(/\s/g, "");

    if (lowerAutocomplete === lowerSearch) {
      return;
    }

    event.preventDefault();

    const typeahead = lowerAutocomplete.replace(lowerSearch, "");
    const search = `${prevSearch}${typeahead}`;

    this.setState({ autocomplete: null, search, searching: true });
    this.fetchSuggestions(search);
    this.performSearch(search);
  };

  handleSuggestionClick = suggestion => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState({ search: suggestion, searching: true });
    this.performSearch(suggestion);
  };

  performSearch = query => {
    if (!this.componentIsMounted) {
      return Promise.resolve();
    }

    const { base, token } = this.props;

    return this.client.search(query).then(results => {
      if (this.componentIsMounted) {
        this.setState({ results, searching: false });
      }
    });
  };

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    const { contentRef, onSelect } = this.props;
    const { autocomplete, results, search, searching, suggestions } = this.state;

    return (
      <Search
        autocomplete={autocomplete}
        contentRef={contentRef || this.contentRef}
        inputRef={this.inputRef}
        onSearchChange={this.handleSearchChange}
        onSearchKeyDown={this.handleSearchKeyDown}
        onSuggestionClick={this.handleSuggestionClick}
        onSelect={onSelect}
        results={results}
        search={search}
        searching={searching}
        suggestions={suggestions}
      />
    );
  }
}

export default Tenor;
