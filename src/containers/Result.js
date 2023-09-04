import React, { useEffect } from "react";
import Scroll from "../components/scroll/Scroll";
import { connect } from "react-redux";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import { setResultData } from "../redux/actions";

const mapStateToProps = (state) => {
  const { result, isPending, error } = state.getResultData;

  return {
    result: result,
    isPending: isPending,
    error: error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetResultData: () => dispatch(setResultData()),
  };
};

const Result = (props) => {
  const { result, isPending } = props;

  useEffect(() => {
    props.onSetResultData();
  }, [props.onSetResultData]);

  const { score, keterangan, kesimpulan } = result;

  return isPending ? (
    <h1 style={{ color: "white" }}> Loading </h1>
  ) : (
    <div className="tc">
      <Scroll>
        <ErrorBoundary>
          <h1 style={{ color: "white" }}>Results</h1>
          <h3 style={{ color: "white" }}>Score: {score} </h3>
          <h3 style={{ color: "white" }}>Keterangan: {keterangan} </h3>
          <h3 style={{ color: "white" }}>Kesimpulan: {kesimpulan} </h3>
          <div style={{ height: "800px" }}>
            <div>
              <img
                src="http://localhost:5000/plot/seaborn"
                alt=""
                height={500}
                width={500}
              />
            </div>
            <div>
              <img
                src="http://localhost:5000/plot/plt"
                alt=""
                height={500}
                width={500}
              />
            </div>
          </div>
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
