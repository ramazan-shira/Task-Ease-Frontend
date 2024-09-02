import { useSelector } from "react-redux";
import "./help.css";
const Help = (props) => {
  const { closeHelpModal } = props;

  const users = useSelector((state) => state.user.users);

  const admins = users.filter((user) => user.role === 1);
  return (
    <div className="help-container">
      <div className="modal">
        <div className="modal-content help">
          <span className="close" onClick={closeHelpModal}>
            &times;
          </span>
          <p className="help-title">Contact administrator for help</p>
          <div className="help-content">
            {admins.map((admin) => (
              <div className="help-admin" key={admin._id}>
                <div className="help-admin-img">
                  <img src={admin.image} alt="admin" />
                </div>
                <div className="help-admin-name">
                  <p>{admin.name}</p>
                </div>
                <div className="help-admin-info">
                  <p>{admin.email}</p>
                  <p>{admin.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
