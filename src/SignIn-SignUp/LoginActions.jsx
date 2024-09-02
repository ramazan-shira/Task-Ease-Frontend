const LoginActions = (props) => {
  const { signin, setSignin } = props;
  const handleSignin = () => {
    setSignin(false);
  };

  const handleSignUp = () => {
    setSignin(true);
  };
  return (
    <>
      <div className="signin">
        <h1>Welcome back!</h1>
        <p>
          To keep connected with us, please {signin ? "login" : "sign up"} with
          your personal info
        </p>

        <button
          className="signin-btn"
          onClick={signin ? handleSignin : handleSignUp}
        >
          {" "}
          {signin ? "Sign in" : "Sign up"}
        </button>
      </div>
    </>
  );
};

export default LoginActions;
