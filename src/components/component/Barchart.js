import { Bar } from "react-chartjs-2";
export const Barchart = ({month,value}) => {

  const data = {
    labels: month,
    datasets: [
        {
          label: 'Sharing rate of certificate',
          data: value,
          backgroundColor: '#36a2eb',
          borderWidth: 1,
        }
    ]
  }

  return (
    <div className="chart-container">
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};