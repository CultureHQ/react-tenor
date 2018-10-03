import React, { Component } from "react";
import ReactDOM from "react-dom";

import Tenor from "../src";
import "../src/styles.css";

class App extends Component {
  state = { selected: null };

  handleSelect = selected => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;

    return (
      <main className="container">
        <h1><a href="https://github.com/CultureHQ/react-tenor">react-tenor</a></h1>
        <div className="selected">
          {selected && <img src={selected.media[0].tinygif.url} alt="Selected GIF" />}
        </div>
        <Tenor onSelect={this.handleSelect} />
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("main"));
