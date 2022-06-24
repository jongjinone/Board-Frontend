import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {CookiesProvider } from "react-cookie";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CookiesProvider>
        <App />
      </CookiesProvider> {/*쿠키를 사용가능하게 만들어 줌.*/}
    </Router>
    </React.StrictMode>,
  document.getElementById("root")
);
