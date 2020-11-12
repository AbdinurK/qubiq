import React from 'react';
import Header from './components/Header/Header'
import UserCard from "./containers/Card/UserCard";
import UserTable from "./containers/Table/UserTable";
import DealCard from "./containers/Card/DealCard";
import { Switch, Route } from "react-router-dom"

function App() {
  return (
    <div style={{ minWidth: 1440, display: 'flex', flexDirection: 'column' }}>
      <Header/>
      <Switch>
          <Route exact path={"/"} component={UserCard}/>
          <Route exact path={"/deals"} component={UserTable}/>
          <Route exact path={"/deals/:id"} component={DealCard}/>
      </Switch>
    </div>
  );
}

export default App;
