import {CHANGE_SEARCH_FIELD,
        REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_REJECT,REQUEST_ROBOTS_RESOLVE,
        REQUEST_TRAIN_DATASET_PENDING, REQUEST_TRAIN_DATASET_REJECT, REQUEST_TRAIN_DATASET_RESOLVE,
        REQUEST_TEST_DATASET_PENDING, REQUEST_TEST_DATASET_REJECT, REQUEST_TEST_DATASET_RESOLVE,
        REQUEST_RESULT_PENDING, REQUEST_RESULT_REJECT, REQUEST_RESULT_RESOLVE} from './constants';

// * declare the initial state first
const initialState = {
    search: {
        searchValue: ""
    },
    robots: {
        isPending: false,
        robots: [],
        error:""
    },
    train_dataset: {
        isPending: false,
        train_dataset: [],
        error:""
    },
    test_dataset: {
        isPending: false,
        test_dataset: [],
        error:""
    },
    result: {
        isPending: false,
        result: [],
        error:""
    }
}

// * Perlu diingat bila state yg disimpan dalam redux-store harus read only, sehingga bila ingin mengubah state
// * harus membuat copy dari state yg ada di store tadi (copy by value) yg kemudian baru bisa diganti value tadi.

// * here is the function or reducers that takes care the state of search bar
// * kasih default value agar lebih aman jika tidak ada data yang dikirimnkan ke parameter
// * action disini adalah action yang akan diterima oleh function searchData yg dikirim dari action.js

export const searchData = (state = initialState.search, action = {}) => {
    const {type,payload} = action;
    switch (type) {
        case CHANGE_SEARCH_FIELD:
            return { ...state, searchValue: payload }
        default:
            return state;
    }
}

export const getData = (state= initialState.robots, action={}) => {

    
    switch (action.type) {
        case REQUEST_ROBOTS_PENDING:
            return  Object.assign({},state, {isPending: true});
        case REQUEST_ROBOTS_RESOLVE:
            return  Object.assign({},state, {robots: action.payload, isPending: false});
        case REQUEST_ROBOTS_REJECT:
            return  Object.assign({},state, {error: action.payload, isPending: false});
        default:
            return state;
    }
}

export const getTrainData = (state= initialState.train_dataset, action={}) => {
    
    switch (action.type) {
        case REQUEST_TRAIN_DATASET_PENDING:
            return  Object.assign({},state, {isPending: true});
        case REQUEST_TRAIN_DATASET_RESOLVE:
            return  Object.assign({},state, {train_dataset: action.payload, isPending: false});
        case REQUEST_TRAIN_DATASET_REJECT:
            return  Object.assign({},state, {error: action.payload, isPending: false});
        default:
            return state;
    }
}

export const getTestData = (state= initialState.test_dataset, action={}) => {

    switch (action.type) {
        case REQUEST_TEST_DATASET_PENDING:
            return  Object.assign({},state, {isPending: true});
        case REQUEST_TEST_DATASET_RESOLVE:
            return  Object.assign({},state, {test_dataset: action.payload, isPending: false});
        case REQUEST_TEST_DATASET_REJECT:
            return  Object.assign({},state, {error: action.payload, isPending: false});
        default:
            return state;
    }
}

export const getResultData = (state= initialState.result, action={}) => {
    switch (action.type) {
        case REQUEST_RESULT_PENDING:
            return  Object.assign({},state, {isPending: true});
        case REQUEST_RESULT_RESOLVE:
            return  Object.assign({},state, {result: action.payload, isPending: false});
        case REQUEST_RESULT_REJECT:
            return  Object.assign({},state, {error: action.payload, isPending: false});
        default:
            return state;
    }
}