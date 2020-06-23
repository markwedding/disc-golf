// index.tsx
import React from "react";
import { render } from "react-dom";

// enable parcel HMR
if (module.hot) {
  module.hot.accept();
}

console.log("Hello from tsx!");

render(<p>Hello</p>, document.getElementById("root"));
