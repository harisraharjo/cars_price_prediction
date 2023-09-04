import React from "react";
import { connect } from "react-redux";
import SearchBar from "../components/search-bar/SearchBar";
import HomePage from "./Homepage";
import Train from "./Train";
import Result from "./Result";
import Predict from "./Predict";
import { setSearchValue } from "../redux/actions";

import { Route, Switch, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const mapStateToProps = (state) => {
  const { searchValue } = state.searchData;

  return {
    searchValue: searchValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchValue(event.target.value)),
  };
};

const App = (props) => {
  const { searchValue, onSearchChange } = props;

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto" style={{ paddingTop: "20px" }}>
          <NavLink
            to="/"
            style={{ padding: "10px", margin: "10px", color: "white" }}
          >
            Home
          </NavLink>
          <NavLink
            to="/train-test"
            style={{ padding: "10px", margin: "10px", color: "white" }}
          >
            Train & Test
          </NavLink>
          <NavLink
            to="/predict"
            style={{ padding: "10px", margin: "10px", color: "white" }}
          >
            Predict
          </NavLink>
          <NavLink
            to="/result"
            style={{ padding: "10px", margin: "10px", color: "white" }}
          >
            Result
          </NavLink>
        </Nav>
        <SearchBar searchValue={onSearchChange} />
      </Navbar>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <HomePage {...props} searchValue={searchValue} />}
        />
        <Route
          exact
          path="/train-test"
          render={(props) => <Train {...props} searchValue={searchValue} />}
        />
        <Route
          exact
          path="/predict"
          render={(props) => <Predict {...props} searchValue={searchValue} />}
        />
        <Route exact path="/result" render={(props) => <Result {...props} />} />
      </Switch>
      {/* <a href="/"><h1 className="light-gray f1">Car Showroom</h1></a> */}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
