import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./mainPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginActions from "./LoginActions";

const MainPage = (props) => {
  const { setRefetch } = props;

  const [signin, setSignin] = useState(false);
  return (
    <div className="main-page">
      <div className="user-form">
        <div className="sign-actions">
          <LoginActions setSignin={setSignin} signin={signin} />
        </div>
        <div className="sign">
          {signin ? (
            <SignUp signin={signin} setRefetch={setRefetch} />
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
