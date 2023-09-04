import React, { useEffect } from "react";
import { connect } from "react-redux";
import Scroll from "../components/scroll/Scroll";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import CardList from "../components/card-list/CardList";

import { setTrainData } from "../redux/actions";

const mapStateToProps = (state) => {
  const { train_dataset, isPending, error } = state.getTrainData;

  return {
    train_dataset: train_dataset,
    isPending: isPending,
    error: error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetTrainData: () => dispatch(setTrainData()),
  };
};

const Train = (props) => {
  const { searchValue, train_dataset, isPending } = props;
  useEffect(() => {
    props.onSetTrainData();
  }, [props.onSetTrainData]);

  const filteredDataset = train_dataset.filter((data) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Train);
