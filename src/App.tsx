import React from "react";
import { Widget } from "@luna-market-deployer/nft-checkout";
// import { Widget } from "./lib";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Widget
        bgimg="/assets/background.png"
        curryLogo="/assets/curry-logo.png"
        lunaLogo="/assets/luna-logo.svg"
      />
    </div>
  );
}

export default App;
