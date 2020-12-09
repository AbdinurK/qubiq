import React from 'react';
import Header from './components/Header/Header'
import UserCard from "./containers/Card/UserCard";
import UserTable from "./containers/Table/UserTable";
import DealCard from "./containers/Card/DealCard";
import Dashboard from "./containers/Dashboard/Dashboard";
import { Switch, Route } from "react-router-dom"
import 'antd/dist/antd.css';

function App() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header/>
      <Switch>
          <Route exact path={"/"} component={UserCard}/>
          <Route exact path={"/deals"} component={UserTable}/>
          <Route exact path={"/deals/:id"} component={DealCard}/>
          <Route exact path={"/dashboard/:id"} component={Dashboard}/>
      </Switch>
    </div>
  );
}

export default App;
