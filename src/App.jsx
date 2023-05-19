import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { routeGenerator } from "./routes";

function App(props) {
  return (
    <Router>
      <Switch>
        {routeGenerator({
          // eslint-disable-next-line react/prop-types
          ...props,
        })}
      </Switch>
    </Router>
  );
}

export default App;
