import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import "./dashboard.css";
import { useSelector } from "react-redux";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const UsersChart = () => {
  const users = useSelector((state) => state.user.users);

  const rolesCount = users.reduce(
    (acc, user) => {
      if (user.role === 1) acc.admin += 1;
      if (user.role === 2) acc.user += 1;
      return acc;
    },
    { admin: 0, user: 0 }
  );

  const data = {
    labels: ["Admin", "User"],
    datasets: [
      {
        data: [rolesCount.admin, rolesCount.user],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pie-chart-container">
      <p>User Roles Distribution</p>
      <Pie data={data} />
    </div>
  );
};

export default UsersChart;
