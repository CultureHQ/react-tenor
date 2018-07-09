import React, { Component } from "react";

class Result extends Component {
  handleClick = () => {
    const { result, onSelect } = this.props;

    onSelect(result);
  };

  render() {
    const { result } = this.props;

    return (
      <button
        key={result.id}
        type="button"
        onClick={this.handleClick}
        className="react-tenor--result"
        style={{ backgroundImage: `url(${result.media[0].tinygif.url})` }}
      />
    );
  }
}

export default Result;
