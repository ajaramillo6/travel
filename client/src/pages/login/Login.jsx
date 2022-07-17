import { useContext, useRef } from "react";
import { loginCall } from '../../apiCalls';
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching, theme } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({ username: userRef.current.value, password: passwordRef.current.value }, dispatch);
}

  return (
    <div className="login" data-theme={theme}>
      <div className="loginContainer">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter your username..."
            ref={userRef}
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter your password..."
            ref={passwordRef}
          />
          <div className="loginSubmit" type="submit" disabled={isFetching}>
            { isFetching ? (
            <div className="loginLoaders">
              <div className="lds-dual-ring"></div>
              <div className="lds-heart">
                <div><i className="fa-solid fa-plane"></i></div>
              </div>
            </div>
            ):
            <button className="loginButton">Login</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
