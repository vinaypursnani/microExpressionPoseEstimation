import React from "react";
import LineChart from "./Chart";

export default function MetricsBlock({ metrics = [], timeFrame }) {
  return metrics.map((metric) => (
    <div className="metric-block" key={metric._id}>
      <div className="graph-title">{metric.measure}</div>
      <LineChart chartDataId={metric._id} timeFrame={timeFrame} />
      <Dimensions dimensions={metric.dimensions} />
    </div>
  ));
}

function Dimensions({ dimensions = [] }) {
  return (
    <div className="dimensions">
      {dimensions.map((dimension, index) => (
        <div className="dimensions-head" key={index}>
          <p>{dimension.name}</p>
          <p>{dimension.value}</p>
        </div>
      ))}
    </div>
  );
}
