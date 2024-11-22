import React, { useEffect, useRef } from "react";
import drawChart from "./drawChart";

const DonutChart = ({ data }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      drawChart(ref.current, data);
    }
  }, [ref]);

  return (
    <div className="container">
      <div className="graph" ref={ref} />
    </div>
  );
};

export default React.memo(DonutChart);