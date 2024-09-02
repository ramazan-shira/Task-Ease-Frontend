import { useSelector } from "react-redux";
import "./navbar.css";

const NavBar = () => {
  const loggedUser = useSelector((state) => state.user.loggedUser);
  return (
    <div className="navbar">
      <div className="search">
        <input
          className="search-input"
          type="text"
          defaultValue="&#x1F50E;&#xFE0E; Search"
        />
      </div>

      <div className="profile">
        <div className="notifications">
          <button>
            <i className="fa-regular fa-bell"></i>
          </button>
        </div>
        <div className="user-profile">
          <button title={loggedUser.name}>
            <img src={loggedUser.image} alt="profile" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
