import React, { Component } from "react";
import Portfolio from "../portfolio/Portfolio";
import FilterTrades from "../search/FilterTrades";
import Trade from "../trade/Trade";
import { connect } from "react-redux";
class Dashboard extends Component {
  render() {
    return (
      this.props.isAuthenticatedUser ? (
        <div className="Dashboard">
          <FilterTrades />
          <Portfolio />
          <Trade />
        </div>
      ) : null
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticatedUser: state.isAuthenticatedUser
  };
};

export default connect(mapStateToProps)(Dashboard);
