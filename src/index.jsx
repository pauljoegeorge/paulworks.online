import React from "react";
import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const tagManagerArgs = {
  gtmId: `${import.meta.env.VITE_GTM_CONTAINER_ID}`,
};
TagManager.initialize(tagManagerArgs);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


