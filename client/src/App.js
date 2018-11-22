import React, { Component } from "react";
import "./App.css";
import NavBar from "./tab/NavBar";
import LatestPrices from "./ticker/LatestPrices";
import Dashboard from './dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <LatestPrices/>
        <NavBar/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
