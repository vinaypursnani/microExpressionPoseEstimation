import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function LineChart({ chartDataId, timeFrame = 365 }) {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  function getLineStatus(lineStatus) {
    switch (lineStatus) {
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return false;

      default:
        return false;
    }
  }

  //fetch chart json form backend
  useEffect(() => {
    axios
      .get(`https://visualizer-dash.herokuapp.com/metrics/${chartDataId}`)
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  const lastRecord = chartData.length - 1;
  console.error(error);

  //Restructure data to suit graph library
  const refinedData = chartData
    .slice([lastRecord - timeFrame], [lastRecord])
    .map((data) => {
      return {
        value: getLineStatus(data.line_status) ? null : data.original_value,
        timeStamp: data.timestamp.substring(0, 10),
        lineValue: getLineStatus(data.line_status) ? data.original_value : null,
        forecastedValue: data.forecasted_value,
        bandRange: [data.min_band, data.max_band],
      };
    });

  return (
    <ResponsiveContainer width="90%" height="80%">
      <ComposedChart
        className="container"
        width={600}
        height={300}
        data={refinedData}
      >
        <Line
          dataKey="value"
          stroke="#8884d8"
          dot={false}
          isAnimationActive={false}
        />
        <Line
          className="z-10"
          dataKey="lineValue"
          stroke="red"
          dot={false}
          isAnimationActive={false}
        />
        <Line
          className="z-11"
          dataKey="forecastedValue"
          stroke="#8884d8"
          strokeDasharray="2 2"
          dot={false}
          isAnimationActive={false}
        />
        <Area
          dataKey="bandRange"
          fill="gray"
          dot={false}
          stroke="none"
          isAnimationActive={false}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timeStamp" />
        <YAxis />
        <Tooltip />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
