import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "'DM Sans', system-ui, sans-serif";
ChartJS.defaults.color = "#3e504a";

const barOptions = {
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#eeece3" } }
  }
};

const pieOptions = {
  plugins: { legend: { position: "bottom", labels: { usePointStyle: true, padding: 18 } } }
};

function DashboardCharts({ dashboard }) {

  const barData = {

    labels: [
      "Jobs",
      "Applications",
      "Shortlisted",
      "Interview",
      "Hired"
    ],

    datasets: [

      {

        label: "Recruiter Analytics",

        data: [

          dashboard.totalJobs,
          dashboard.totalApplications,
          dashboard.shortlisted,
          dashboard.interviewScheduled,
          dashboard.hired

        ],

        backgroundColor: [

          "#0d1f1a",
          "#0e7a64",
          "#f4a62a",
          "#2c6fe0",
          "#c8e83f"

        ],

        borderColor: [

          "#0d1f1a",
          "#0b6552",
          "#d98e12",
          "#1f55b8",
          "#9fbd1c"

        ],

        borderWidth: 2,

        borderRadius: 8

      }

    ]

  };

  const pieData = {

    labels: [

      "Shortlisted",
      "Interview",
      "Hired"

    ],

    datasets: [

      {

        data: [

          dashboard.shortlisted,
          dashboard.interviewScheduled,
          dashboard.hired

        ],

        backgroundColor: [

          "#f4a62a",
          "#2c6fe0",
          "#0e7a64"

        ],

        borderColor: "#ffffff",

        borderWidth: 2

      }

    ]

  };

  return (

    <div className="row g-4 mt-1">

      <div className="col-lg-7">

        <div className="chart-card">

          <h3>
            Analytics
          </h3>

          <Bar data={barData} options={barOptions} />

        </div>

      </div>

      <div className="col-lg-5">

        <div className="chart-card">

          <h3>
            Hiring Status
          </h3>

          <Pie data={pieData} options={pieOptions} />

        </div>

      </div>

    </div>

  );

}

export default DashboardCharts;