import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo.png";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser } from "../Redux/Actions/userActions";

const Sidebar = (props) => {
  const { setToggleHelpModal, isExpanded, setIsExpanded } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const dispatch = useDispatch();

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSignOut = () => {
    dispatch(setLoggedUser({}));
    localStorage.setItem("loggedUser_id", 0);
    navigate("/");
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  };

  const manageUsers = () => {
    navigate("/manage-users");
    toggleSubMenu("manage-users");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1500) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSideBar = () => {
    if (window.innerWidth < 1500) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`container ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className={`head ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className={`logo ${isExpanded ? "expanded" : "collapsed"}`}>
            <img src={Logo} alt="logo" />
          </div>
          {window.innerWidth < 1500 && (
            <div
              className={`menu-btn ${isExpanded ? "expanded" : "collapsed"}`}
              onClick={toggleSideBar}
            >
              <i
                className={`ph-bold ph-caret-${isExpanded ? "left" : "right"}`}
              ></i>
            </div>
          )}
        </div>
        <div className={`nav ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className={`menu ${isExpanded ? "expanded" : "collapsed"}`}>
            <p className="title">{isExpanded && "Main"}</p>
            <ul>
              <li
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                <a
                  href="#"
                  onClick={() => navigate("/dashboard")}
                  title="Dashboard"
                >
                  <i className="ph ph-squares-four"></i>
                  {isExpanded && <span className="text">Dashboard</span>}
                </a>
              </li>
              {loggedUser?.role === 1 && (
                <li
                  className={
                    location.pathname.startsWith("/manage-users")
                      ? "active"
                      : ""
                  }
                >
                  <a href="#" onClick={manageUsers} title="Manage Users">
                    <i className="icon ph-bold ph-user"></i>
                    {isExpanded && <span className="text">Manage Users</span>}
                    {isExpanded && (
                      <i
                        className={`arrow ph-bold ph-caret-${
                          openSubMenu === "manage-users" ? "up" : "down"
                        }`}
                      ></i>
                    )}
                  </a>
                  {isExpanded && (
                    <ul
                      className="sub-menu"
                      style={{
                        display:
                          openSubMenu === "manage-users" ? "block" : "none",
                      }}
                    >
                      <li>
                        <a
                          href="#"
                          onClick={() => navigate("/manage-users-users")}
                        >
                          <span className="text">Users</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => navigate("/manage-users-admins")}
                        >
                          <span className="text">Admins</span>
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              )}
              <li
                className={
                  location.pathname.startsWith("/tasks") ? "active" : ""
                }
              >
                <a
                  href="#"
                  onClick={() => {
                    toggleSubMenu("tasks");
                    navigate("/tasks-everything");
                  }}
                  title="Tasks"
                >
                  <i className="icon ph ph-checks"></i>
                  {isExpanded && <span className="text">Tasks</span>}
                  {isExpanded && (
                    <i
                      className={`arrow ph-bold ph-caret-${
                        openSubMenu === "tasks" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </a>
                {isExpanded && (
                  <ul
                    className="sub-menu"
                    style={{
                      display: openSubMenu === "tasks" ? "block" : "none",
                    }}
                  >
                    <li>
                      <a href="#" onClick={() => navigate("/tasks-everything")}>
                        <i className="ph ph-circles-four"></i>
                        <span className="text">Everything</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => navigate("/tasks-development")}
                      >
                        <i className="ph ph-code"></i>
                        <span className="text">Development</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => navigate("/tasks-marketing")}>
                        <i className="ph ph-chart-line-up"></i>
                        <span className="text">Marketing</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => navigate("/tasks-hr")}>
                        <i className="ph ph-users"></i>
                        <span className="text">Human Resources</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => navigate("/tasks-retails")}>
                        <i className="ph ph-cash-register"></i>
                        <span className="text">Retails</span>
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className={`menu ${isExpanded ? "expanded" : "collapsed"}`}>
            <p className="title">{isExpanded && "Settings"}</p>
            <ul>
              <li className={location.pathname === "/settings" ? "active" : ""}>
                <a
                  href="#"
                  onClick={() => navigate("/settings")}
                  title="Settings"
                >
                  <i className="icon ph-bold ph-gear"></i>
                  {isExpanded && <span className="text">Settings</span>}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={`menu ${isExpanded ? "expanded" : "collapsed"}`}>
          <ul>
            {loggedUser?.role === 2 && (
              <li>
                <a
                  href="#"
                  onClick={() => setToggleHelpModal(true)}
                  title="Help"
                >
                  <i className="fa-regular fa-circle-question"></i>
                  {isExpanded && <span className="text">Help</span>}
                </a>
              </li>
            )}
            <li onClick={handleSignOut}>
              <a href="#" title="Logout">
                <i className="icon ph-bold ph-sign-out"></i>
                {isExpanded && <span className="text">Logout</span>}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
