import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "./mainPage.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser, setUser } from "../Redux/Actions/userActions";

const SignUp = (props) => {
  const { setRefetch } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const nameRegEx = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegEx = /^\+?[1-9]\d{1,14}$/;
  const passLengthRegEx = /^.{8,}$/;
  const passFormatRegEx =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  const [showPassword, setShowPassword] = useState(false);

  const users = useSelector((state) => state.user.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    let validSignUp = false;
    if (name === "") {
      setNameError("Full Name cannot be empty!");
      validSignUp = false;
    } else if (!nameRegEx.test(name)) {
      setNameError("First name and last name must have at least 3 characters!");
      validSignUp = false;
    } else {
      setNameError("");
      validSignUp = true;
    }

    if (email === "") {
      setEmailError("Email cannot be empty!");
      validSignUp = false;
    } else if (
      users.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase())
      )
    ) {
      setEmailError("Email registered!Please try with another email!");
      validSignUp = false;
    } else if (!emailRegEx.test(email)) {
      setEmailError("Invalid email address!");
      validSignUp = false;
    } else {
      setEmailError("");
      validSignUp = true;
    }

    if (phone === "") {
      setPhoneError("Phone number cannot be empty!");
      validSignUp = false;
    } else if (!phoneRegEx.test(phone)) {
      setPhoneError("Invalid phone number!Correct format +XX XXX XXX XXXX!");
      validSignUp = false;
    } else {
      setPhoneError("");
      validSignUp = true;
    }

    if (password === "") {
      setPasswordError("Password cannot be empty!");
      validSignUp = false;
    } else if (!passLengthRegEx.test(password)) {
      setPasswordError("Password must have at least 8 characters!");
      validSignUp = false;
    } else if (!passFormatRegEx.test(password)) {
      setPasswordError(
        "Password must have at least one uppercase letter, one lowercase letter, one digit and one special character!"
      );
      validSignUp = false;
    } else {
      setPasswordError("");
      validSignUp = true;
    }

    if (validSignUp) {
      try {
        const imageResponse = await axios.get("https://picsum.photos/50");

        const profileImage = imageResponse.request.responseURL;

        const response = await axios.post(
          "https://backend-production-faaa.up.railway.app/api/users",
          {
            image: profileImage,
            name: name,
            email: email,
            phone: phone,
            password: password,
            role: 2,
          }
        );

        if (response.data?.type === "error") {
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
          const user = response.data.user;
          dispatch(
            setUser({
              id: user._id,
              image: user.image,
              name: user.name,
              email: user.email,
              phone: user.phone,
              password: user.password,
              role: user.role,
            })
          );
          dispatch(
            setLoggedUser({
              id: user._id,
              image: user.image,
              name: user.name,
              email: user.email,
              phone: user.phone,
              password: user.password,
              role: user.role,
            })
          );
          localStorage.setItem("loggedUser_id", user._id);
          navigate("/dashboard");
          toast.success("Your account has been created!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setEmailError("");
          setPhoneError("");
          setNameError("");
          setPasswordError("");
        }
      } catch (error) {
        console.error("Error signing up:", error);
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
      }
    }
  };

  return (
    <>
      <div className="sign-up">
        <h1>Create Account</h1>
        <div className="form-input">
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="p"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>
                <i className="fa-solid fa-user"></i> Full Name
              </label>
            </div>
            <div className="error">{nameError}</div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="p"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>
                <i className="fa-solid fa-envelope"></i> Email
              </label>
            </div>
            <div className="error">{emailError}</div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="p"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>
                <i className="fa-solid fa-phone"></i> Phone number
              </label>
            </div>
            <div className="error">{phoneError}</div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="p"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="error">{passwordError}</div>
          </div>
          <div className="actions">
            <button onClick={handleSignUp}>Sign up</button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default SignUp;
