import "./App.css";
import Drinks from "./pages/Drinks";
import DrinkDetails from "./pages/DrinkDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Drinks />
          </Route>
          <Route exact path="/drink-details/:id">
            <DrinkDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
