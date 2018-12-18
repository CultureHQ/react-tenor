import React, { Component } from "react";

class Suggestion extends Component {
  handleClick = () => {
    const { suggestion, onSuggestionClick } = this.props;

    onSuggestionClick(suggestion);
  };

  render() {
    const { suggestion } = this.props;

    return <button type="button" onClick={this.handleClick}>{suggestion}</button>;
  }
}

export default Suggestion;
