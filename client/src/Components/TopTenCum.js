import React from "react";
import { connect } from "react-redux";
import "../App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Text,
  ResponsiveContainer
} from "recharts";

const TopTenCumBOE = props => {
  const formatYaxis = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h3 style={{ color: "white" }}>Cumulative BOE</h3>
      <div style={{ width: "100%", height: "70vh" }}>
        <ResponsiveContainer>
          <BarChart
            data={props.cumBoe}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="wellName"
              interval={0}
              angle={45}
              fontSize={12}
              textAnchor="start"
              height={200}
              style={{
                fill: "white",
                // fontSize: "50%",
                wordWrap: "break-word"
              }}
            />
            <Text width={30} />
            <YAxis
              fontSize={12}
              tickFormatter={formatYaxis}
              style={{
                fill: "white"
              }}
            />
            <Tooltip formatter={formatYaxis} />
            <Bar dataKey="cumBoe" fill="#349CDB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cumBoe: state.query.cumBoe
  };
};

export default connect(mapStateToProps)(TopTenCumBOE);
