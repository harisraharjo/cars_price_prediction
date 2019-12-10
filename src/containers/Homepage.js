import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Scroll from '../components/scroll/Scroll';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import CardList from '../components/card-list/CardList';

import { setRobotsData } from '../redux/actions';


const mapStateToProps = state => {
    const {robots,isPending,error} = state.getData

    return {
        // ? what state do I want to have as my props
        // * This state is a bundle of a multiple reducers (rootReducers), so in order to call a specific reducers we have to travers through the tree
        robots: robots,
        isPending: isPending,
        error: error
      
    }
}

const mapDispatchToProps = dispatch => {
    // ? What action do I want to send to the reducers?
    return {
        // * the input box from search bar
        // * send setSearchValue action
        onSetRobotsData: () => dispatch(setRobotsData())
    }
}

const HomePage = (props) => {

    const {searchValue, robots, isPending} = props;
    // * useEffect without Cleanup
    useEffect(() => {
        // // * IIFE
        // // ? what is this second param?

        // ! Warning if not passing the empty array to the second arguments
        // ! =========================================================================
        // ! React Hook useEffect contains a call to 'setRobotsData'. 
        // ! Without a list of dependencies, this can lead to an infinite chain of updates. 
        // ! To fix this, pass [] as a second argument to the useEffect 
        // ! Hook  react-hooks/exhaustive-deps
        props.onSetRobotsData()
        
    },[props.onSetRobotsData]);

    const filteredRobots = robots.filter(robot => {
        return robot.make.toLowerCase().includes(searchValue.toLowerCase());
    });

    return isPending ? <h1 style={{color: "white"}}> Loading </h1> : (
        <div className="tc">
            <Scroll>
                <ErrorBoundary>
                    <CardList robotsData={filteredRobots} />
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);