import "./index.css";
import Cookies from "js-cookie";

import { BiShow } from "../../icons";
import { useState, useReducer } from "react";
import { publicPostRequest } from "../../serverCalls";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../customHooks";
import { hideSnackbar } from "../../components/snackbar";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { snackbar, setSnackbar } = useSnackbar();
  let from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  // login user
  console.log(password, "=-----------------", email);
  const loginUser = async () => {
    try {
      console.log(email, "=======", password);
      const response = await publicPostRequest("/api/auth/login", {
        email,
        password,
      });

      console.log("from server inside try only");

      if (response.data.encodedToken) {
        setSnackbar({
          ...snackbar,
          status: true,
          text: "Login sucessful!",
          type: "success-toast",
        });
        hideSnackbar(setSnackbar);

        // have to redirect and store token and show alert
        Cookies.set("jwt_token", "213", { expires: 1 });
        navigate(from, { replace: true });
      } else {
        console.log("someting went wrong with your cred's");
        setSnackbar({
          ...snackbar,
          status: true,
          text: "Login not sucessful!",
          type: "warn-toast",
        });
        hideSnackbar(setSnackbar);
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      // show error response
      setSnackbar({
        ...snackbar,
        status: true,
        text: "Login not sucessful!",
        type: "warn-toast",
      });
      hideSnackbar(setSnackbar);
      setEmail("");
      setPassword("");
      console.log("<===========error while login =========> ");
    }
  };
  // set credentials
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  return (
    <div className="flex-H-center-H">
      <div className="auth-form">
        <h2 className="text-align-center">Login</h2>
        <div>
          <label>Email</label>
          <input type="text" onChange={updateEmail} value={email} />
        </div>
        <div>
          <label>Password</label>
          <div className="rel-pos">
            <input type="password" onChange={updatePassword} value={password} />
            <BiShow className="input-icon" />
          </div>
        </div>
        <button className="btn primary-icon-btn" id="cta" onClick={loginUser}>
          Login
        </button>
        <button className="btn primary-icon-btn" id="cta">
          Bot
        </button>
      </div>
    </div>
  );
}

// sign up form

function Signup(props) {
  return (
    <div className="flex-H-center-H">
      <form className="auth-form">
        <h2 className="text-align-center">Login</h2>
        <div>
          <label>Email</label>
          <input type="text" />
        </div>
        <div>
          <label>full Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <label>confirm password</label>
          <input type="password" />
        </div>
        <button className="btn primary-icon-btn" id="cta">
          sign up
        </button>
        <small>
          Have an account <strong>Login</strong>
        </small>
      </form>
    </div>
  );
}

export { Login, Signup };
