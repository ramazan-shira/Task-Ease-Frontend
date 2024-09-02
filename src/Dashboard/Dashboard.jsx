import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./dashboard.css";
import Calendar from "./Calendar";
import MyTasks from "./MyTasks";
import UsersChart from "./UsersChart";
import Message from "./Message";
import Teams from "./Teams";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers } from "../Redux/Actions/userActions";
import { setTasks } from "../Redux/Actions/taskActions";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [refetch, setRefetch] = useState("start");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      dispatch(setUsers(response.data));
      setRefetch(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      dispatch(setTasks(response.data));
      setRefetch(false);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    if (refetch === "start" || refetch === true) {
      fetchUsers();
      fetchTasks();
    }
  }, [refetch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const users = useSelector((state) => state.user.users);
  const loggedUser = useSelector((state) => state.user.loggedUser);

  const adminCount = users.filter((user) => user.role === "admin").length;
  const userCount = users.filter((user) => user.role === "user").length;

  const data = {
    labels: ["Admins", "Users"],
    datasets: [
      {
        label: "Number of Users",
        data: [adminCount, userCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Distribution",
      },
    },
  };

  return windowWidth > 1100 ? (
    <div className="dashboard">
      <div className="dashboard-row">
        <Calendar />
        <Message />
      </div>
      <div className="dashboard-row">
        <Teams />
        {loggedUser?.role === 1 && <UsersChart />}
        <MyTasks />
      </div>
    </div>
  ) : (
    <div className="dashboard">
      <div className="dashboard-row">
        <Calendar />
        <Message />
      </div>
      <div className="dashboard-row">
        <div className="dashboard-group">
          <Teams />
          {loggedUser?.role === 1 && <UsersChart />}
        </div>
        <MyTasks />
      </div>
    </div>
  );
};

export default Dashboard;
