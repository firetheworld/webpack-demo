
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Bank from './pages/bank';
import Fund from './pages/fund';


function App() {
  return (
    <div>
        <Switch>
            <Route path='/bank'>
                <Bank />
            </Route>
            <Route path='/fund'>
                <Fund />
            </Route>
            <Route path='/'>
                <Bank />
            </Route>
        </Switch>
    </div>
  );
}

function SimpleApp() {
    return <App />;
}
  

ReactDOM.render(
  <BrowserRouter>
    <SimpleApp />
  </BrowserRouter>,
  document.getElementById("root")
);