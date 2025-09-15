import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

export default function LineGraph() {
  const { monthlyStats } = useSelector(
    (state) => state.user
  );
  return (
    <>
      <Line
        data={{
          labels: monthlyStats.map((item) => item.month),
          datasets: [
            {
              label: "Money Saved",
              data: monthlyStats.map((item) => item.savings),
              backgroundColor: "rgba(239, 68, 68)",
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false, // <-- allow it to stretch
          scales: {
            y: { beginAtZero: true },
          },
        }}
      />
    </>
  );
}
