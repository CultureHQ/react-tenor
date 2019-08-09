import React, { Component } from "react";

import Client from "./Client";
import Search from "./Search";

const DEFAULT_STATE = {
  autoComplete: null,
  autoFocus: false,
  page: 0,
  pages: [],
  search: "",
  searching: false,
  suggestions: []
};

const DELAY = 250;

const KEYS = {
  Tab: 9,
  ArrowLeft: 37,
  ArrowRight: 39
};

class Tenor extends Component {
  constructor(props) {
    super(props);

    const { base, token, defaultResults } = props;
    this.client = new Client({ base, token, defaultResults });

    this.contentRef = React.createRef();
    this.inputRef = React.createRef();

    this.state = {
      ...DEFAULT_STATE,
      search: props.initialSearch || "",
      searching: !!props.initialSearch
    };
  }

  componentDidMount() {
    const { autoFocus, initialSearch, defaultResults } = this.props;

    this.componentIsMounted = true;
    window.addEventListener("keydown", this.handleWindowKeyDown);
    window.addEventListener("click", this.handleWindowClick);

    if (initialSearch || defaultResults) {
      this.fetchAutoComplete(initialSearch);
      this.fetchSuggestions(initialSearch);
      this.performSearch(initialSearch);
    }

    if (autoFocus) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const { base, token } = this.props;

    if (base !== prevProps.base || token !== prevProps.token) {
      this.client = new Client({ base, token });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
    window.removeEventListener("keydown", this.handleWindowKeyDown);
    this.componentIsMounted = false;
  }

  fetchAutoComplete = currentSearch => (
    this.client.autocomplete(currentSearch).then(({ results: [autoComplete] }) => {
      const { search } = this.state;

      if (search === currentSearch) {
        this.mountedSetState({ autoComplete });
      }
    })
  );

  fetchSuggestions = currentSearch => (
    this.client.suggestions(currentSearch).then(({ results: suggestions }) => {
      const { search } = this.state;

      if (search === currentSearch) {
        this.mountedSetState({ suggestions });
      }
    })
  );

  handleWindowClick = event => {
    const { contentRef } = this.props;
    const { search } = this.state;

    if (!search) {
      return;
    }

    const container = (contentRef || this.contentRef).current;
    if (container.contains(event.target)) {
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState(DEFAULT_STATE);
  };

  handleWindowKeyDown = event => {
    const { contentRef } = this.props;

    if (
      !(contentRef || this.contentRef).current.contains(event.target)
      || ([KEYS.ArrowLeft, KEYS.ArrowRight].indexOf(event.keyCode) === -1)
      || !event.metaKey
    ) {
      return;
    }

    event.preventDefault();

    if (event.keyCode === KEYS.ArrowLeft) {
      this.handlePageLeft();
    } else {
      this.handlePageRight();
    }
  };

  handlePageLeft = () => {
    this.setState(({ page }) => ({ page: page === 0 ? 0 : page - 1 }));
  };

  handlePageRight = () => {
    const { defaultResults } = this.props;
    const {
      page,
      pages,
      search,
      searching
    } = this.state;

    if ((!defaultResults && !search) || searching) {
      return Promise.resolve();
    }

    if (page < pages.length - 1) {
      this.setState(({ page: prevPage }) => ({ page: prevPage + 1 }));
      return Promise.resolve();
    }

    return this.client.search(search, pages[page].next).then(nextPage => {
      if (nextPage.results) {
        this.mountedSetState(({ page: prevPage, pages: prevPages }) => ({
          page: prevPage + 1,
          pages: prevPages.concat([nextPage]),
          searching: false
        }));
      }
    }).catch(() => {
      this.mountedSetState({ searching: false });
    });
  };

  handleSearchChange = ({ target: { value: search } }) => {
    const { defaultResults } = this.props;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (!defaultResults && !search.length) {
      this.setState(DEFAULT_STATE);
      return;
    }

    this.setState({ autoComplete: null, search, searching: true });
    this.fetchAutoComplete(search);
    this.fetchSuggestions(search);
    this.timeout = setTimeout(() => this.performSearch(search), DELAY);
  };

  handleSearchKeyDown = event => {
    const { autoComplete, search: prevSearch } = this.state;

    if (event.keyCode !== KEYS.Tab || !autoComplete || !prevSearch) {
      return;
    }

    const lowerAutoComplete = autoComplete.toLowerCase();
    const lowerSearch = prevSearch.toLowerCase().replace(/\s/g, "");

    if (lowerAutoComplete === lowerSearch) {
      return;
    }

    event.preventDefault();

    const typeahead = lowerAutoComplete.replace(lowerSearch, "");
    const search = `${prevSearch}${typeahead}`;

    this.setState({ autoComplete: null, search, searching: true });
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

  performSearch = search => {
    if (!this.componentIsMounted) {
      return Promise.resolve();
    }

    return this.client.search(search).then(page => {
      this.mountedSetState({ page: 0, pages: [page], searching: false });
    }).catch(() => {
      this.mountedSetState({ searching: false });
    });
  };

  mountedSetState = mutation => {
    if (this.componentIsMounted) {
      this.setState(mutation);
    }
  };

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    const { contentRef, onSelect } = this.props;
    const {
      autoComplete, page, pages, search, searching, suggestions
    } = this.state;

    return (
      <Search
        autoComplete={autoComplete}
        contentRef={contentRef || this.contentRef}
        inputRef={this.inputRef}
        onPageLeft={this.handlePageLeft}
        onPageRight={this.handlePageRight}
        onSearchChange={this.handleSearchChange}
        onSearchKeyDown={this.handleSearchKeyDown}
        onSuggestionClick={this.handleSuggestionClick}
        onSelect={onSelect}
        results={pages[page] ? pages[page].results : []}
        search={search}
        searching={searching}
        suggestions={suggestions}
      />
    );
  }
}

export default Tenor;
