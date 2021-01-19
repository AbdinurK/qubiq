import React from 'react';
import Header from './components/Header/Header'
import UserCard from "./containers/Card/UserCard";
import UserTable from "./containers/Table/UserTable";
import DealCard from "./containers/Card/DealCard";
import DashboardDetail from "./containers/Dashboard/DashboardDetail";
import TeamDashboard from "./containers/Dashboard/TeamDashboard";
import { Switch, Route } from "react-router-dom"
import 'antd/dist/antd.css';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Switch>
            <Route exact path={"/"} component={UserCard}/>
            <Route exact path={"/deals"} component={UserTable}/>
            <Route exact path={"/deals/:id"} component={DealCard}/>
            <Route exact path={"/dashboard/:id"} component={DashboardDetail}/>
            <Route exact path={"/dashboard"} component={TeamDashboard}/>
        </Switch>
    </React.Fragment>
  );
}

export default App;
