import React from "react";
import ReactDOM from "react-dom";

import Tenor from "../src";
import "../src/styles.css";

ReactDOM.render(
  /* eslint no-console: off */
  <Tenor onSelect={result => console.log(result)} />,
  document.getElementById("main")
);
