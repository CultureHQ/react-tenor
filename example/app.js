import React from "react";
import ReactDOM from "react-dom";

import Tenor from "../src";

ReactDOM.render(
  <Tenor token={process.env.TOKEN} onSelect={result => console.log(result)} />, /* eslint no-console: off */
  document.getElementById("main")
);
