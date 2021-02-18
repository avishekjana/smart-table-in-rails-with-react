import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Products from "./views/products";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" exact component={Products} />
          <Route path="/products" exact component={Products} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
