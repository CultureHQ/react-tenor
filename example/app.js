import React from "react";
import ReactDOM from "react-dom";

import Tenor from "../src";

ReactDOM.render(
  /* eslint no-console: off */
  <Tenor token={process.env.TOKEN} onSelect={result => console.log(result)} />,
  document.getElementById("main")
);
