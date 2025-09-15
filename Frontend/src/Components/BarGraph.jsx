import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

export default function BarGraph() {
    const { monthlyStats } = useSelector(
    (state) => state.user
  );
  return (
    <>
      <Bar
        data={{
          labels: monthlyStats.map((arr) => arr.month),

          datasets: [
            {
              label: "Income",
              data: monthlyStats.map((arr) => arr.income),
              backgroundColor: "#161853",
              borderRadius: "2",
            },
            {
              label: "Expenses",
              data: monthlyStats.map((arr) => arr.expense),
              backgroundColor: "rgb(239, 68, 68)",
              borderRadius: "2",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Yearly Analysis",
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
        redraw
      />
    </>
  );
}
