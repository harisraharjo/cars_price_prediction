import {CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_REJECT,REQUEST_ROBOTS_RESOLVE,
    REQUEST_TRAIN_DATASET_PENDING, REQUEST_TRAIN_DATASET_REJECT, REQUEST_TRAIN_DATASET_RESOLVE,
    REQUEST_TEST_DATASET_PENDING, REQUEST_TEST_DATASET_REJECT, REQUEST_TEST_DATASET_RESOLVE,
    REQUEST_RESULT_PENDING, REQUEST_RESULT_REJECT, REQUEST_RESULT_RESOLVE} from './constants';

//  * action for search field. return berupa object (tanpa perlu statement return tgl dibungkus dgn ())
export const setSearchValue = (text) => ({
    // * typenya pakai constant agar ada error bila misspelled the words, ada juga yg pakai String
    // * payload adalah data yg akan dikirim ke reducer / functions
    type: CHANGE_SEARCH_FIELD,
    payload: text
});

// * action for getting data from API, return berupa function karena asynchronous calls.
// * INGAT! Bila yg akan di dispatch ke reducer hanya berupa object dgn isi type dan payload
// ! redux secara default tidak mengerti funcion di bawah ini, karena func ini tdk mereturn object ttp function (Higher Order Function)---
// * ttp karena ada thunkMiddleware maka redux jadi mengetahuinya.

export const setRobotsData = () => (dispatch) => {
    dispatch({type: REQUEST_ROBOTS_PENDING});
    fetch("http://localhost:5000/")
        .then(response => {
            if(response.status === 200){
                const jason = response.json()
                const dude = JSON.stringify(jason)
                console.log(dude);
                
                return jason;
             }else{
                throw new Error("Not 200");
             }
        })
        .then(data => {
            dispatch({type: REQUEST_ROBOTS_RESOLVE, payload: data});
        })
        .catch(err => dispatch({type: REQUEST_ROBOTS_REJECT, payload: err}));
}

export const setTrainData = () => (dispatch) => {
    dispatch({type: REQUEST_TRAIN_DATASET_PENDING});
    fetch("http://localhost:5000/train-test")
        .then(response => {
            // console.log(`the RESP: \n ${response.json()}`);
            if(response.status === 200){
                const jason = response.json()
                const dude = JSON.stringify(jason)
                console.log(dude);
                
                return jason;
             }else{
                throw new Error("Not 200");
             }
        })
        .then(data => {
            dispatch({type: REQUEST_TRAIN_DATASET_RESOLVE, payload: data});
        })
        .catch(err => dispatch({type: REQUEST_TRAIN_DATASET_REJECT, payload: err}));
}

export const setTestData = () => (dispatch) => {
    dispatch({type: REQUEST_TEST_DATASET_PENDING});
    fetch("http://localhost:5000/predict")
        .then(response => {
            // console.log(`the RESP: \n ${response.json()}`);
            if(response.status === 200){
                const jason = response.json();
                return jason;
                
                // const parsed = JSON.parse(response);
                // console.log(parsed);
                // return parsed;
             }else{
                throw new Error("Not 200");
             }
        })
        .then(data => {
            dispatch({type: REQUEST_TEST_DATASET_RESOLVE, payload: data});
        })
        .catch(err => dispatch({type: REQUEST_TEST_DATASET_REJECT, payload: err}));
}

export const setResultData = () => (dispatch) => {
    dispatch({type: REQUEST_RESULT_PENDING});
    fetch("http://localhost:5000/result")
        .then(response => {
            if(response.status === 200){
                const jason = response.json();
                console.log("JASON: ");
                console.log(jason);
                return jason;
             }else{
                throw new Error("Not 200");
             }
        })
        .then(data => {
            console.log("THE DATA: ");
            console.log(data);
            dispatch({type: REQUEST_RESULT_RESOLVE, payload: data});
        })
        .catch(err => dispatch({type: REQUEST_RESULT_REJECT, payload: err}));
}