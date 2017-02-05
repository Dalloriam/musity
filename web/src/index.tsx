import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, Link} from "react-router";

import { Layout, Home } from "./pages"
import { Card } from "./components/card/card";

const root = document.getElementById("root");

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>

      <IndexRoute component={Home}/>

      <Route component={Home}>
        <Route path="/:locId" component={Card}/>
      </Route>

    </Route>
  </Router>, 
root);