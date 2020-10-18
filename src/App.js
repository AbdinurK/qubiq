import React from 'react';
import Header from './components/Header/Header'
import UserCard from "./containers/Card/UserCard";
import UserTable from "./containers/Table/UserTable";
import { Switch, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
          <Route exact path={"/"} component={UserCard}/>
          <Route path={"/deals"} component={UserTable}/>
      </Switch>
    </div>
  );
}

export default App;
