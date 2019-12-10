import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Scroll from '../components/scroll/Scroll';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import CardList from '../components/card-list/CardList';

import { setTrainData } from '../redux/actions';
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";


const mapStateToProps = state => {
    const {train_dataset,isPending,error} = state.getTrainData

    return {
        // ? what state do I want to have as my props
        // * This state is a bundle of a multiple reducers (rootReducers), so in order to call a specific reducers we have to travers through the tree
        train_dataset: train_dataset,
        isPending: isPending,
        error: error
      
    }
}

const mapDispatchToProps = dispatch => {
    // ? What action do I want to send to the reducers?
    return {
        onSetTrainData: () => dispatch(setTrainData())
    }
}

const Train = (props) => {  
    
    const {searchValue, train_dataset, isPending} = props;
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
        props.onSetTrainData()
        
    },[props.onSetTrainData]);

    const filteredDataset = train_dataset.filter(data => {
        return data.make.toLowerCase().includes(searchValue.toLowerCase());
    });

    return isPending ? <h1 style={{color: "white"}}> Loading </h1> : (
            <div className="tc">
                {/* <Link to={{
                        pathname: "/predict",
                        state: {
                            searchValue: searchValue
                        }
                    }}>
                    <Button>
                        Predict
                    </Button>
                </Link> */}
            <Scroll>
                <ErrorBoundary>
                    <CardList robotsData={filteredDataset} isTrainDataset = {true} />
                </ErrorBoundary>
            </Scroll>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Train);