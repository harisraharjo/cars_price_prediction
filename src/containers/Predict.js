import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Scroll from '../components/scroll/Scroll';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import CardList from '../components/card-list/CardList';

import { setTestData } from '../redux/actions';
import { Button } from "react-bootstrap";


const mapStateToProps = state => {
    const {test_dataset,isPending,error} = state.getTestData

    return {
        // ? what state do I want to have as my props
        // * This state is a bundle of a multiple reducers (rootReducers), so in order to call a specific reducers we have to travers through the tree
        test_dataset: test_dataset,
        isPending: isPending,
        error: error
      
    }
}

const mapDispatchToProps = dispatch => {
    // ? What action do I want to send to the reducers?
    return {
        onSetTestData: () => dispatch(setTestData())
    }
}

const Predict = (props) => {
    
    const {searchValue, test_dataset, isPending} = props;
    // const {searchValue} = props.location.state;
    // const {searchValue} = props.location.state;
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
        props.onSetTestData()
        
    },[props.onSetTestData]);

    const filteredDataset = test_dataset.filter(data => {
        return data.make.toLowerCase().includes(searchValue.toLowerCase());
    });

    return isPending ? <h1 style={{color: "white"}}> Loading </h1> : (
        <div className="tc">
            <Scroll>
                <ErrorBoundary>
                    <CardList robotsData={filteredDataset} isTrainDataset = {true} />
                </ErrorBoundary>
            </Scroll>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Predict);