import React from "react";
import { Doughnut } from "react-chartjs-2";


export default function App(props) {
  const data = {
    labels: ["Fetched Count: ", "Shared Count: "],
    datasets: [
      {
        data: [props.dataCount.fetchedCount, props.dataCount.sharedCount],
        backgroundColor: ["#f3622d", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 2
      }
    ]
  };
  return <div style={{marginTop:'30px'}}><Doughnut height={210} data={data} /></div>;
}