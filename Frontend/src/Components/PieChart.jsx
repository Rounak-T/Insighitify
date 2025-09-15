import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

export default function Piechart() {
  const { income , expense } = useSelector((state) => state.user);

  return (
    <Doughnut
      data={{
        labels: ["Income", "Expenses"],

        datasets: [
          {
            data: [income, expense],
            backgroundColor: ["#161853", "rgb(239, 68, 68)"],
            borderWidth: 0,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Monthly Analysis",
          },
        },
      }}
      redraw
    />
  );
}
