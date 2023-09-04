import React, { useEffect } from "react";
import { connect } from "react-redux";
import Scroll from "../components/scroll/Scroll";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import CardList from "../components/card-list/CardList";

import { setRobotsData } from "../redux/actions";

const mapStateToProps = (state) => {
  const { robots, isPending, error } = state.getData;

  return {
    robots: robots,
    isPending: isPending,
    error: error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetRobotsData: () => dispatch(setRobotsData()),
  };
};

const HomePage = (props) => {
  const { searchValue, robots, isPending } = props;

  useEffect(() => {
    props.onSetRobotsData();
  }, [props.onSetRobotsData]);

  const filteredRobots = robots.filter((robot) => {
    return robot.make.toLowerCase().includes(searchValue.toLowerCase());
  });

  return isPending ? (
    <h1 style={{ color: "white" }}> Loading </h1>
  ) : (
    <div className="tc">
      <Scroll>
        <ErrorBoundary>
          <CardList robotsData={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
