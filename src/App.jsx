import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { routeGenerator } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

function App(props) {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          {routeGenerator({
            // eslint-disable-next-line react/prop-types
            ...props,
          })}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
