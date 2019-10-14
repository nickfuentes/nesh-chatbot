import React from "react";
import Map from "../map/Map";
import { connect } from "react-redux";
import TopTenCumBOE from "../chart/TopTenCum";
// import StackedAreaChart from "../chart/StackedChart";
import ExampleQueries from "./ExampleQueries";

const Landing = props => {
  const comp = props.compType;

  if (comp === "cumBoe") {
    return <TopTenCumBOE />;
  } else if (comp === "Map") {
    return <Map />;
  } else {
    return <ExampleQueries />;
    // <StackedAreaChart />;

    // null;
  }
};

const mapStateToProps = state => {
  return {
    compType: state.query.compType
  };
};

export default connect(mapStateToProps)(Landing);
