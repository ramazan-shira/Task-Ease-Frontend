import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import MainPage from "./SignIn-SignUp/MainPage.jsx";
import { useSelector } from "react-redux";
import ManageUsers from "./ManageUsers/ManageUsers.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import "./style.css";
import NavBar from "./Navbar/NavBar.jsx";
import Settings from "./Settings/Settings.jsx";
import { useState } from "react";
import ManageUsersPanel from "./ManageUsers/ManageUsersPanel.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Help from "./Help/Help.jsx";
import Tasks from "./Tasks/Tasks.jsx";
import EditTask from "./Tasks/EditTask.jsx";

function App() {
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const location = useLocation();
  const [toggleHelpModal, setToggleHelpModal] = useState(false);
  const [onlyMyTasks, setOnlyMyTasks] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const closeHelpModal = () => {
    setToggleHelpModal(false);
  };

  const NavHiddenPaths = [
    "/tasks-everything",
    "/tasks-development",
    "/tasks-marketing",
    "/tasks-hr",
    "/tasks-retails",
    "/tasks/:id",
  ];

  return (
    <div className={location.pathname === "/" ? "app" : "app container"}>
      {loggedUser && Object.keys(loggedUser).length > 0 && (
        <Sidebar
          setToggleHelpModal={setToggleHelpModal}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      )}
      <div
        className={`page-content ${loggedUser ? "logged" : ""} ${
          !isExpanded ? "collapsed" : ""
        }`}
      >
        {!NavHiddenPaths.includes(location.pathname) &&
          !location.pathname.startsWith("/tasks/") &&
          loggedUser &&
          Object.keys(loggedUser).length > 0 && <NavBar />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {loggedUser.role === 1 && (
            <Route path="/manage-users" element={<ManageUsers />} />
          )}
          <Route
            path="/manage-users-admins"
            element={<ManageUsersPanel page="Admin" />}
          />

          <Route
            path="/manage-users-users"
            element={<ManageUsersPanel page="Users" />}
          />

          <Route
            path="/tasks-everything"
            element={<Tasks page="everything" />}
          />

          <Route
            path="/tasks-development"
            element={<Tasks page="development" />}
          />

          <Route path="/tasks-marketing" element={<Tasks page="marketing" />} />

          <Route path="/tasks-hr" element={<Tasks page="human-resources" />} />

          <Route path="/tasks-retails" element={<Tasks page="retails" />} />

          <Route path="/tasks/:id" element={<EditTask />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
        {toggleHelpModal && <Help closeHelpModal={closeHelpModal} />}
      </div>
    </div>
  );
}

export default App;
