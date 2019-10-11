import React from "react";
import { connect } from "react-redux";
import "../App.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const TopTenCumBOE = props => {
  const formatYaxis = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h3 style={{ color: "white" }}>Cumulative BOE</h3>
      <BarChart
        width={900}
        height={500}
        data={props.cumBoe}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        viewBox={(0, 0, 600, 900)}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="wellName"
          interval={0}
          angle={45}
          fontSize={12}
          textAnchor="start"
          height={200}
          color="white"
        />
        <YAxis fontSize={12} tickFormatter={formatYaxis} />
        <Tooltip formatter={formatYaxis} />
        <Bar dataKey="cumBoe" fill="#349CDB" />
      </BarChart>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cumBoe: state.query.cumBoe
  };
};

export default connect(mapStateToProps)(TopTenCumBOE);
