import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];
const StackedAreaChart = () => ({
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "70vh",
          backgroundColor: "rgb(244, 231, 0)",
          padding: 20,
          borderRadius: 5
        }}
      >
        <ResponsiveContainer>
          <AreaChart
            width={600}
            height={400}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              style={{
                fill: "rgb(13, 28, 40)",
                wordWrap: "break-word"
              }}
            />
            <YAxis
              style={{
                fill: "rgb(13, 28, 40)",
                wordWrap: "break-word"
              }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stackId="1"
              stroke="rgb(0, 132, 169)"
              fill="rgb(0, 132, 169)"
              fillOpacity="1"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="rgb(0, 87, 118)"
              fill="rgb(0, 87, 118)"
              fillOpacity="1"
            />
            <Area
              type="monotone"
              dataKey="amt"
              stackId="1"
              stroke="rgb(13, 28, 40)"
              fill="rgb(13, 28, 40)"
              fillOpacity="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
});

export default StackedAreaChart;
