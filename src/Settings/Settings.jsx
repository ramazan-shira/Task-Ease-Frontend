import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "./settings.css";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../Redux/Actions/userActions";

const Settings = () => {
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const [imageURL, setImageURL] = useState(loggedUser?.image);
  const [name, setName] = useState(loggedUser?.name);
  const [email, setEmail] = useState(loggedUser?.email);
  const [phone, setPhone] = useState(loggedUser?.phone);
  const [password, setPassword] = useState(loggedUser?.password);

  const [imageURError, setImageURLError] = useState("");
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

  const dispatch = useDispatch();

  useEffect(() => {
    setName(loggedUser?.name);
    setEmail(loggedUser?.email);
    setPassword(loggedUser?.password);
  }, [loggedUser]);

  const saveProfile = async () => {
    let validSignUp = false;
    if (imageURL === "") {
      setImageURLError("Image URL cannot be empty!");
      validSignUp = false;
    } else {
      setImageURLError("");
      validSignUp = true;
    }

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
      const savedProfile = { image: imageURL, name, email, phone, password };

      try {
        if (!loggedUser.id) {
          console.error("User ID is undefined");
          toast.error("User ID is undefined");
          return;
        }

        const response = await axios.put(
          `http://localhost:5000/api/users/profile/${loggedUser.id}`,
          savedProfile
        );

        if (response.data.type === "error") {
          toast.error("Something went wrong!");
          console.error(response.data);
        } else {
          const user = response.data.user;
          dispatch(
            editProfile({
              id: user._id,
              image: user.image,
              name: user.name,
              email: user.email,
              phone: user.phone,
              password: user.password,
            })
          );
          toast.success("Profile updated successfully!", {
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
      } catch (error) {
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
        console.error(error);
      }
    }
  };

  return (
    <div className="settings">
      <div className="edit-profile">
        <div className="title">
          <p>Edit Profile</p>
        </div>

        <div className="profile-form">
          <div className="profile-details">
            <div className="input-box">
              <label>Image URL</label>
              <input
                type="text"
                placeholder="Full name"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>
            {imageURError && <div className="error">{imageURError}</div>}

            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {nameError && <div className="error">{nameError}</div>}

            <div className="input-box">
              <label>Email</label>
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <div className="error">{emailError}</div>}

            <div className="input-box">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {phoneError && <div className="error">{phoneError}</div>}

            <div className="input-box">
              <label>Password</label>
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {passwordError && <div className="error">{passwordError}</div>}
          </div>

          <div className="save-btn">
            <button onClick={saveProfile}>Save changes</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
