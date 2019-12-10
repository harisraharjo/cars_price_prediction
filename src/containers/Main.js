import React from 'react'
import { connect } from 'react-redux';
import SearchBar from '../components/search-bar/SearchBar';
import HomePage from './Homepage';
import Train from './Train';
import Result from './Result';
import Predict from './Predict';
import { setSearchValue } from '../redux/actions';

import { Route, Switch, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const mapStateToProps = state => {
    // const {robots,isPending,error} = state.getData
    
    const {searchValue} = state.searchData

    return {
        // ? what state do I want to have as my props
        // * This state is a bundle of a multiple reducers (rootReducers), so in order to call a specific reducers we have to travers through the tree
        searchValue: searchValue
        
            // robots: robots,
            // isPending: isPending,
            // error: error
      
    }
}

const mapDispatchToProps = dispatch => {
    // ? What action do I want to send to the reducers?
    return {
        // * the input box from search bar
        // * send setSearchValue action
        onSearchChange: event => dispatch(setSearchValue(event.target.value))
        // onSetRobotsData: () => dispatch(setRobotsData())
    
    }
}

const App = (props) => {
    const {searchValue, onSearchChange} = props;

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Nav className="mr-auto" style={{paddingTop: "20px"}}>
                    <NavLink to="/" style={{padding: "10px", margin: "10px", color: "white"}}>Home</NavLink>
                    <NavLink to="/train-test" style={{padding: "10px",margin: "10px", color: "white"}}>Train & Test</NavLink>
                    <NavLink to="/predict" style={{padding: "10px",margin: "10px", color: "white"}}>Predict</NavLink>
                    <NavLink to="/result" style={{padding: "10px",margin: "10px", color: "white"}}>Result</NavLink>
                </Nav>
                <SearchBar searchValue={onSearchChange} />
            </Navbar>
            <Switch>
                <Route exact path="/" render={(props) => <HomePage  {...props}  searchValue={searchValue} />} />
                <Route exact path="/train-test" render={(props) => <Train  {...props}  searchValue={searchValue} />} />
                <Route exact path="/predict" render={(props) => <Predict  {...props} searchValue={searchValue} />} />
                <Route exact path="/result" render={(props) => <Result  {...props} />} />
            </Switch>
            {/* <a href="/"><h1 className="light-gray f1">Car Showroom</h1></a> */}
        </>
    );
}

// * this connect function is a HOF . see advanced function topics
// ! this is what happened in this below Connect syntax ---
// * This App container (bcs it's have its own state so its not an ordinary component anymore) knows that redux store is exist bcs its connected ---
// * So this App is subscribe (listening) to specific state changes that takes place in redux store that this App needs
// * This specific state is passed on by parameter via mapStateToProps
// * And mapDispatchToProps is function that will send specific action (in action.js) to the reducer (in reducer.js) which going to be executed in that reducer prior to the changes that happened to the state
// * after executing those parameters, this Connect() will send the props to App

export default connect(mapStateToProps,mapDispatchToProps)(App);