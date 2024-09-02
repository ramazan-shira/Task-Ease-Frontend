import { useState } from "react";
import "./mainPage.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../Redux/Actions/userActions";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [emailL, setEmailL] = useState("");
  const [passwordL, setPasswordL] = useState("");
  const [loginError, setLoginError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async () => {
    const userToLogin = { email: emailL, password: passwordL };
    try {
      const response = await axios.post(
        "https://backend-production-faaa.up.railway.app/api/users/login",
        userToLogin
      );
      if (response.data.type === "error") {
        setLoginError(response.data.message);
        return;
      }

      const user = response.data;
      if (user) {
        navigate("/dashboard");
        dispatch(
          setLoggedUser({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            image: user.image,
            role: user.role,
            password: user.password,
          })
        );
        localStorage.setItem("loggedUser_id", user._id);
      } else {
        dispatch(setLoggedUser({}));
        localStorage.setItem("loggedUser_id", 0);
        setLoginError("Email and password do not match!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in">
      <h1>Log in</h1>
      <div className="form-input">
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              placeholder="p"
              value={emailL}
              onChange={(e) => setEmailL(e.target.value)}
            />
            <label>
              <i className="fa-solid fa-envelope"></i> Email
            </label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="p"
              value={passwordL}
              onChange={(e) => setPasswordL(e.target.value)}
            />
            <label>
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>
        </div>

        {loginError && <div className="error">{loginError}</div>}
        <div className="actions">
          <button onClick={handleLogIn}>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
