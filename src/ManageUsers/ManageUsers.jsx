import { useNavigate } from "react-router-dom";
import "./manageUsers.css";
import { ToastContainer } from "react-toastify";

const ManageUsers = () => {
  const navigate = useNavigate();

  const navigateToAdmins = () => {
    navigate("/manage-users-admins");
  };

  const navigateToUsers = () => {
    navigate("/manage-users-users");
  };

  return (
    <div className="manage-users">
      <div className="page-title">
        <h1>Manage Users</h1>
      </div>
      <div className="manage-users-btn">
        <ul>
          <li>
            <div className="manage-users-admins">
              {window.innerWidth > 780 ? (
                <p>Manage - Admins &#x2192; </p>
              ) : (
                <p>Manage - Admins</p>
              )}
              <button onClick={navigateToAdmins}>Manage Admins</button>
            </div>
          </li>
          <li>
            <div className="manage-users-users">
              {window.innerWidth > 780 ? (
                <p>Manage - Users &#x2192; </p>
              ) : (
                <p>Manage - Admins</p>
              )}
              <button onClick={navigateToUsers}>Manage Users</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManageUsers;
