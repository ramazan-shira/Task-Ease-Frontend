import { useSelector } from "react-redux";
import "./dashboard.css";

const Message = () => {
  const users = useSelector((state) => state.user.users);

  return (
    <div className="message">
      <div className="message-title">Message</div>
      <div className="message-users">
        {users.map((user, index) => (
          <div className="message-user" key={index}>
            <div className="user-image">
              <img src={user.image} alt="user" />
            </div>
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
