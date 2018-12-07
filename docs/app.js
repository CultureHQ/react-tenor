import React, { useState } from "react";
import ReactDOM from "react-dom";

import Tenor from "../src";
import "../src/styles.css";

const App = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <nav>react-tenor</nav>
      <main>
        <h1>
          <a href="https://github.com/CultureHQ/react-tenor">react-tenor</a>
        </h1>
        <div className="selected">
          {selected && <img src={selected.media[0].tinygif.url} alt="Selected GIF" />}
        </div>
        <Tenor onSelect={setSelected} />
      </main>
      {ReactDOM.createPortal(
        <footer>
          <p>
            Copyright (c) 2018 CultureHQ
            <br />
            <a href="https://github.com/CultureHQ/react-tenor">
              github.com/CultureHQ/react-tenor
            </a>
          </p>
        </footer>,
        document.body
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("main"));
