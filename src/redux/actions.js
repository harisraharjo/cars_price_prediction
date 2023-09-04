import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_REJECT,
  REQUEST_ROBOTS_RESOLVE,
  REQUEST_TRAIN_DATASET_PENDING,
  REQUEST_TRAIN_DATASET_REJECT,
  REQUEST_TRAIN_DATASET_RESOLVE,
  REQUEST_TEST_DATASET_PENDING,
  REQUEST_TEST_DATASET_REJECT,
  REQUEST_TEST_DATASET_RESOLVE,
  REQUEST_RESULT_PENDING,
  REQUEST_RESULT_REJECT,
  REQUEST_RESULT_RESOLVE,
} from "./constants";

export const setSearchValue = (text) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text,
});

// * action for getting data from API, return berupa function karena asynchronous calls.

export const setRobotsData = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  fetch("http://localhost:5000/")
    .then((response) => {
      if (response.status === 200) {
        const jason = response.json();

        return jason;
      } else {
        throw new Error("Not 200");
      }
    })
    .then((data) => {
      dispatch({ type: REQUEST_ROBOTS_RESOLVE, payload: data });
    })
    .catch((err) => dispatch({ type: REQUEST_ROBOTS_REJECT, payload: err }));
};

export const setTrainData = () => (dispatch) => {
  dispatch({ type: REQUEST_TRAIN_DATASET_PENDING });
  fetch("http://localhost:5000/train-test")
    .then((response) => {
      if (response.status === 200) {
        const jason = response.json();

        return jason;
      } else {
        throw new Error("Not 200");
      }
    })
    .then((data) => {
      dispatch({ type: REQUEST_TRAIN_DATASET_RESOLVE, payload: data });
    })
    .catch((err) =>
      dispatch({ type: REQUEST_TRAIN_DATASET_REJECT, payload: err })
    );
};

export const setTestData = () => (dispatch) => {
  dispatch({ type: REQUEST_TEST_DATASET_PENDING });
  fetch("http://localhost:5000/predict")
    .then((response) => {
      if (response.status === 200) {
        const jason = response.json();
        return jason;
      } else {
        throw new Error("Not 200");
      }
    })
    .then((data) => {
      dispatch({ type: REQUEST_TEST_DATASET_RESOLVE, payload: data });
    })
    .catch((err) =>
      dispatch({ type: REQUEST_TEST_DATASET_REJECT, payload: err })
    );
};

export const setResultData = () => (dispatch) => {
  dispatch({ type: REQUEST_RESULT_PENDING });
  fetch("http://localhost:5000/result")
    .then((response) => {
      if (response.status === 200) {
        const jason = response.json();
        console.log("JASON: ");
        console.log(jason);
        return jason;
      } else {
        throw new Error("Not 200");
      }
    })
    .then((data) => {
      console.log("THE DATA: ");
      console.log(data);
      dispatch({ type: REQUEST_RESULT_RESOLVE, payload: data });
    })
    .catch((err) => dispatch({ type: REQUEST_RESULT_REJECT, payload: err }));
};
