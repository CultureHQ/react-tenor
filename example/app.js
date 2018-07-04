import React from "react";
import ReactDOM from "react-dom";

import Tenor from "../src";

ReactDOM.render(
  <Tenor token="LIVDSRZULELA" onSelect={result => console.log(result)} />,
  document.getElementById("main")
);
