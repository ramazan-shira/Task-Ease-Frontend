import { useEffect, useState } from "react";
import "./manageUsers.css";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Actions/userActions";

const AddUser = (props) => {
  const { closeAddUserModal, page } = props;

  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const nameRegEx = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegEx = /^\d{10}$/;
  const passLengthRegEx = /^.{8,}$/;
  const passFormatRegEx =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  const [role, setRole] = useState(0);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (page === "Admin") {
      setRole(1);
    } else if (page === "Users") {
      setRole(2);
    }
  }, [page]);

  const addUser = async (e) => {
    e.preventDefault();

    let validSignUp = true;

    if (image === "") {
      setImageError("Image URL cannot be empty!");
      validSignUp = false;
    } else {
      setImageError("");
    }

    if (name === "") {
      setNameError("Full Name cannot be empty!");
      validSignUp = false;
    } else if (!nameRegEx.test(name)) {
      setNameError("First name and last name must have at least 3 characters!");
      validSignUp = false;
    } else {
      setNameError("");
    }

    if (email === "") {
      setEmailError("Email cannot be empty!");
      validSignUp = false;
    } else if (!emailRegEx.test(email)) {
      setEmailError("Invalid email address!");
      validSignUp = false;
    } else {
      setEmailError("");
    }

    if (phone === "") {
      setPhoneError("Phone number cannot be empty!");
      validSignUp = false;
    } else if (!phoneRegEx.test(phone)) {
      setPhoneError("Invalid phone number! Correct format XXXXXXXXXX!");
      validSignUp = false;
    } else {
      setPhoneError("");
    }

    if (password === "") {
      setPasswordError("Password cannot be empty!");
      validSignUp = false;
    } else if (!passLengthRegEx.test(password)) {
      setPasswordError("Password must have at least 8 characters!");
      validSignUp = false;
    } else if (!passFormatRegEx.test(password)) {
      setPasswordError(
        "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character!"
      );
      validSignUp = false;
    } else {
      setPasswordError("");
    }

    if (validSignUp) {
      const newUser = {
        image,
        name,
        email,
        phone,
        password,
        role,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/addUser",
          newUser
        );

        if (response.data.type === "error") {
          toast.error("Something went wrong!");
          console.error(response.data);
        } else {
          const addedUser = response.data.user;
          if (addedUser) {
            dispatch(
              setUser({
                _id: new Date().getTime(),
                image: addedUser.image,
                name: addedUser.name,
                email: addedUser.email,
                phone: addedUser.phone,
                password: addedUser.password,
                role: addedUser.role,
              })
            );
            closeAddUserModal();
            toast.success("User added successfully!", {
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeAddUserModal}>
          &times;
        </span>
        <h1>Add new user</h1>
        <div className="modal-form add-user">
          <div className="modal-group">
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
          {imageError && <div className="error">{imageError}</div>}
          <div className="modal-group">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {nameError && <div className="error">{nameError}</div>}
          <div className="modal-group">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {emailError && <div className="error">{emailError}</div>}
          <div className="modal-group">
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          {phoneError && <div className="error">{phoneError}</div>}
          <div className="modal-group">
            <div className="form-group password-field">
              <label>Password:</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </span>
              </div>
            </div>
          </div>
          {passwordError && <div className="error">{passwordError}</div>}
          <div className="modal-group">
            <div className="form-group">
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value={1}>1(Admin)</option>
                <option value={2}>2(User)</option>
              </select>
            </div>
          </div>
          <button className="save" onClick={addUser}>
            Add user
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
