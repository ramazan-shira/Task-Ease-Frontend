import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setUserToUpdate } from "../Redux/Actions/userActions";

const ManageUsersPanel = (props) => {
  const { page, setRefetch } = props;
  const users = useSelector((state) => state.user.users);
  const loggedUser = useSelector((state) => state.user.loggedUser);

  const [toggleEditUser, setToggleEditUser] = useState(false);
  const [toggleAddUser, setToggleAddUser] = useState(false);
  const [userOnEdit, setUserOnEdit] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 550);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 550);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  const openAddUserModal = () => {
    setToggleAddUser(true);
  };

  const closeAddUserModal = () => {
    setToggleAddUser(false);
  };

  const openEditModal = (user) => {
    dispatch(setUserToUpdate({ user }));
    setUserOnEdit(user);
    setToggleEditUser(true);
  };

  const closeEditModal = () => {
    setToggleEditUser(false);
    setUserOnEdit(null);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `https://backend-production-faaa.up.railway.app/api/users/${userToDelete}`
      );
      if (response.data.type === "error") {
        setShowPopup(false);
        toast.error("Something went wrong!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        setShowPopup(false);
        toast.success("User deleted successfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      dispatch(deleteUser({ userToDelete }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  const filteredUsers = users.filter((user) =>
    page === "Users" ? user.role === 2 : user.role === 1
  );

  return (
    <div className="manage-users-panel">
      <div className="table">
        <section className="main-header grid">
          <h1>{page === "Users" ? "Users" : "Administrators"}</h1>
          <button className="button" onClick={openAddUserModal}>
            <i className="fa-solid fa-plus"></i>
            <span>Add new {page === "Users" ? "user" : "admin"}</span>
          </button>
        </section>

        <main>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td data-label="ID">
                    {isSmallScreen ? `${user._id.slice(0, 6)}...` : user._id}
                  </td>
                  <td data-label="Image" className="user-image">
                    <img src={user.image} alt="user" />
                  </td>
                  <td data-label="Full Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Phone">{user.phone}</td>
                  <td data-label="Password">{user.password}</td>
                  <td data-label="Role">{user.role}</td>
                  <td data-label="Actions">
                    <button
                      className="edit"
                      onClick={() => openEditModal(user)}
                      disabled={user._id === loggedUser.id}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>
                Are you sure you want to delete <br /> this user?
              </p>
              <div className="popup-actions">
                <button onClick={confirmDelete} className="popup-yes">
                  Yes
                </button>
                <button onClick={cancelDelete} className="popup-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {toggleEditUser && (
        <EditUser
          userOnEdit={userOnEdit}
          closeEditModal={closeEditModal}
          setRefetch={setRefetch}
        />
      )}
      {toggleAddUser && (
        <AddUser
          closeAddUserModal={closeAddUserModal}
          page={page}
          setRefetch={setRefetch}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageUsersPanel;
