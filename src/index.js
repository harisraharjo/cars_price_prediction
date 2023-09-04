import React from "react";
import ReactDOM from "react-dom";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import "tachyons";

import "./index.css";
import Main from "./containers/Main";
import * as serviceWorker from "./serviceWorker";
import {
  searchData,
  getData,
  getTrainData,
  getTestData,
  getResultData,
} from "./redux/reducers";
import { BrowserRouter } from "react-router-dom";

const logger = createLogger();

const rootReducers = combineReducers({
  searchData,
  getData,
  getTrainData,
  getTestData,
  getResultData,
});
const store = createStore(
  rootReducers,
  applyMiddleware(thunkMiddleware, logger)
);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
