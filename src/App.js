import React from 'react';
import './App.css';
import Index from "./components/views/Index"
import Songlist from "./components/pages/Songlist"
import Play from "./components/pages/Play"
import { Switch, Route } from "react-router-dom"
function App() {
  return (
    <div className="app">
      {/* <Index></Index> */}
      <Switch>
        <Route path="/sheetdetail/:id" component={Songlist}></Route>
        <Route path="/play/:id" component={Play}></Route>
        <Route path="/" component={Index}></Route>
        {/* <Redirect path="*" to="/"></Redirect>  */}
      </Switch>
    </div>
  );
}

export default App;
