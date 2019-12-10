import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import "tachyons";

import './index.css';
import Main from './containers/Main'
import * as serviceWorker from './serviceWorker';
import { searchData, getData, getTrainData, getTestData, getResultData } from './redux/reducers';
import { BrowserRouter } from "react-router-dom";


// ! This is the middleware (a tunnel) that can be used debug how redux works too.
const logger = createLogger();

// ! creating the store
// *Store is a function from redux to create big javascript object to save all of those states.
// * aplikasi akan memiliki banyak reducers utk tiap2 containers/component. Semua itu akan dijadikan satu menjadi rootReducers.
// * thunkMiddleware berguna untuk menglisten action yg melewati middleware yang return valuenya berupa function (higher order function), bukan berupa object javascript.
const rootReducers = combineReducers({searchData,getData,getTrainData,getTestData,getResultData});
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger));

// ! ada dua cara utk mengpass state dari store: 1. Dgn provider, 2. Lewat props
// *Provider is a function for passing down the states from the parent til them smallest component without passing the states via props
// *The component that wants to get some state data (read: Subscribe to the changes that happened to that specific state).---
// * --- will have to call the method Connect in order to get them from the store via provider. ---
// * --- So only components in which they calls a Connect method that will know that redux is available in the app, the others wont know
//  !this connect method is used to avoid the needs to call a specific function from the props (in this case from a store) like store.subscribe, store.getState etc
// * Store will return a few function that needs to be initialized upon the retrieval from the props

const App =() => {
    return(
        <Provider store={store}>
            <BrowserRouter>    
                <Main />
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(<App />, 
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
