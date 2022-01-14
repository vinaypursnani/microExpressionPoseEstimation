import axios from "axios";
import React, { useState, useEffect } from "react";
import MetricsBlock from "./MetricsBlock";

export default function Metrics() {
  const [metricsData, setMetricsData] = useState([]);
  const [error, setError] = useState(null);
  const [timeFrame, setTimeFrame] = useState(365);

  //fetch data from the backend
  useEffect(() => {
    axios
      .get("https://visualizer-dash.herokuapp.com/metrics")
      .then((response) => {
        setMetricsData(response.data);
        console.log(response);
      })
      .catch((error) => setError(error));
  }, []);

  console.error(error);
  console.log(metricsData);

  return (
    <>
      <select
        onChange={(e) => setTimeFrame(e.target.value)}
        className="timeFrame"
      >
        <option value={10}>10 entries</option>
        <option value={100}>100 entries</option>
        <option defaultChecked value={500}>
          500 entries
        </option>
        <option value={Number.MAX_VALUE}>All entries</option>
      </select>
      <div className="metrics-grid">
        <MetricsBlock metrics={metricsData} timeFrame={timeFrame} />
      </div>
    </>
  );
}
