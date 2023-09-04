import React, { useEffect } from "react";
import { connect } from "react-redux";
import Scroll from "../components/scroll/Scroll";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import CardList from "../components/card-list/CardList";

import { setTestData } from "../redux/actions";

const mapStateToProps = (state) => {
  const { test_dataset, isPending, error } = state.getTestData;

  return {
    test_dataset: test_dataset,
    isPending: isPending,
    error: error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetTestData: () => dispatch(setTestData()),
  };
};

const Predict = (props) => {
  const { searchValue, test_dataset, isPending } = props;

  useEffect(() => {
    props.onSetTestData();
  }, [props.onSetTestData]);

  const filteredDataset = test_dataset.filter((data) => {
    return data.make.toLowerCase().includes(searchValue.toLowerCase());
  });

  return isPending ? (
    <h1 style={{ color: "white" }}> Loading </h1>
  ) : (
    <div className="tc">
      <Scroll>
        <ErrorBoundary>
          <CardList robotsData={filteredDataset} isTrainDataset={true} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Predict);
