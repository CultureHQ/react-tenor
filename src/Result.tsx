import React, { Component } from "react";

const BASE = "https://tenor.com/view/";

class Result extends Component {
  state = { loaded: false };

  componentDidMount() {
    this.componentIsMounted = true;

    const { result } = this.props;

    this.image = new Image();
    this.image.src = result.media[0].tinygif.url;

    this.image.onload = () => {
      if (this.componentIsMounted) {
        this.setState({ loaded: true });
      }
    };
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  getLabel() {
    const { result: { itemurl } } = this.props;

    return itemurl.replace(BASE, "").replace(/-gif-\d+$/, "").replace(/-/g, " ");
  }

  handleClick = () => {
    const { result, onSelect } = this.props;

    onSelect(result);
  };

  render() {
    const { loaded } = this.state;

    return (
      <button
        aria-label={this.getLabel()}
        type="button"
        onClick={this.handleClick}
        className="react-tenor--result"
      >
        {loaded && <span style={{ backgroundImage: `url(${this.image.src})` }} />}
      </button>
    );
  }
}

export default Result;
