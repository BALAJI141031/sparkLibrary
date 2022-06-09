import "./index.css";
import Cookies from "js-cookie";

import { GiWindSlap, MdOutlineKeyboardArrowRight } from "../../icons";
import { useState, useRef } from "react";
import { publicPostRequest } from "../../serverCalls";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useSnackbar, useAuth } from "../../customHooks";
import { hideSnackbar } from "../../components/snackbar";


// sign up form

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const location = useLocation();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const { snackbar, setSnackbar } = useSnackbar();
  const [validatedCredentials, validteCredentials] = useState({
    email: false,
    password: false,
  });

  const [testCredentials, setTestCredentials] = useState(null);

  const submitLoginForm = async (e) => {
    e.preventDefault();
    if (emailInput.current.value === "" && passwordInput.current.value !== "")
      validteCredentials({ email: true, password: false });
    else if (
      passwordInput.current.value === "" &&
      emailInput.current.value !== ""
    )
      validteCredentials({ email: false, password: true });
    else if (
      passwordInput.current.value === "" &&
      emailInput.current.value === ""
    )
      validteCredentials({ email: true, password: true });
    else {
      try {
        const loginResponse = await publicPostRequest("/api/auth/login", {
          email: emailInput.current.value,
          password: passwordInput.current.value,
        });
        Cookies.set("jwt_token", loginResponse.data.encodedToken);
        setSnackbar({
          ...snackbar,
          status: true,
          text: "Login sucessful!",
          type: "success-toast",
        });
        hideSnackbar(setSnackbar);
        setIsLoggedIn(true);
        navigate(location.state?.from?.pathname ?? "/", { replace: true });
      } catch (e) {
        emailInput.current.value = "";
        passwordInput.current.value = "";
        setTestCredentials({
          tesetEmail: "balajinarayana@gmail.com",
          testPassword: "balajinarayana1234",
        });
        if (e.response.status === 401) {
          setSnackbar({
            ...snackbar,
            status: true,
            text: "Invalid email or password. Please try again.!",
            type: "success-toast",
          });
          hideSnackbar(setSnackbar);
        } else if (e.response.status === 404) {
          setSnackbar({
            ...snackbar,
            status: true,
            text: "No user found with this email. Please try again.!",
            type: "success-toast",
          });
          hideSnackbar(setSnackbar);
        } else {
          setSnackbar({
            ...snackbar,
            status: true,
            text: "Unexpected error. Please try again in some time.!",
            type: "success-toast",
          });
          hideSnackbar(setSnackbar);
        }
      }
    }
  };
  return (
    <div className="auth-form">
      <h1>
        Spark Library <GiWindSlap className="hero-icon" />
      </h1>
      <form onSubmit={submitLoginForm}>
        <center>
          <h2>Login</h2>
        </center>
        <div>
          <label>Email address</label>
          <input
            type="email"
            placeholder="email"
            ref={emailInput}
            value={testCredentials && testCredentials.tesetEmail}
            onChange={() =>
              validteCredentials((prev) => ({
                ...prev,
                email: false,
              }))
            }
          />
          {validatedCredentials.email && (
            <p className="style-error">Please Provide Email</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            ref={passwordInput}
            value={testCredentials && testCredentials.testPassword}
            onChange={() =>
              validteCredentials((prev) => ({
                ...prev,
                password: false,
              }))
            }
          />
          {validatedCredentials.password && (
            <p className="style-error">Please Provide password</p>
          )}
        </div>
        <div className="flex-H-space-bw">
          <div className="flex-H-center-V">
            <input type="checkbox" className="checkbox" />
            <p>Remember Me</p>
          </div>
          <p>Forgot Your Password</p>
        </div>
        <button className="primary-cta" id="cta">
          Login
        </button>
        <div
          onClick={() =>
            setTestCredentials({
             tesetEmail: "balajinarayana@gmail.com",
          testPassword: "balajinarayana1234",
            })
          }
        >
          <button className="primary-cta" id="cta">
            Test Login
          </button>
        </div>

        <NavLink to="/signup">
          <div className="account-info">
            <p>Create New Acccount</p>
            <MdOutlineKeyboardArrowRight className="icon" />
          </div>
        </NavLink>
      </form>
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const location = useLocation();
  const { snackbar, setSnackbar } = useSnackbar();
  let intialDetials = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    displayname: "",
    termsAndConditions: false,
  };
  const [detials, setDetials] = useState(intialDetials);
  const submitSignupForm = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      termsAndConditions,
    } = detials;

    if (password.length < 6) {
      setSnackbar({
        ...snackbar,
        status: true,
        text: "Password must be at least 6 characters long!",
        type: "warn-toast",
      });
      hideSnackbar(setSnackbar);
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
    } else if (password.search(/\d/) === -1) {
      setSnackbar({
        ...snackbar,
        status: true,
        text: "Password must contain at least one number!",
        type: "warn-toast",
      });
      hideSnackbar(setSnackbar);
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
    } else if (password.search(/[a-z]/) === -1) {
      setSnackbar({
        ...snackbar,
        status: true,
        text: "Password must contain at least one lowercase letter!",
        type: "warn-toast",
      });
      hideSnackbar(setSnackbar);
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
    } else if (password.search(/[A-Z]/) === -1) {
      setSnackbar({
        ...snackbar,
        status: true,
        text: "Password must contain at least one Uppercase letter!",
        type: "warn-toast",
      });
      hideSnackbar(setSnackbar);
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
    } else if (password !== confirmPassword) {
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
      setSnackbar({
        ...snackbar,
        status: true,
        text: "Entered Passwords Are Not Matching!",
        type: "warn-toast",
      });
      hideSnackbar(setSnackbar);
    } else if (!termsAndConditions) {
      setSnackbar({
        ...snackbar,
        status: true,
        text: "Please Select Termas&Condition!",
        type: "warn-toast",
      });
      hideSnackbar(setSnackbar);
    } else {
      try {
        const signupResponse = await publicPostRequest("/api/auth/signup", {
          firstName: detials.firstName,
          lastName: detials.lastName,
          email: detials.email,
          password: detials.password,
          displayname: detials.displayname,
        });
        Cookies.set("jwt_token", signupResponse.data.encodedToken);
        setSnackbar({
          ...snackbar,
          status: true,
          text: "Account created successfully!",
          type: "success-toast",
        });
        hideSnackbar(setSnackbar);
        setIsLoggedIn(true);
        navigate(location.state?.from?.pathname ?? "/", { replace: true });
      } catch (e) {
        if (e.response.status === 422) {
          setSnackbar({
            ...snackbar,
            status: true,
            text: "Account already exists!",
            type: "success-toast",
          });
          hideSnackbar(setSnackbar);
          setDetials(intialDetials);
        } else {
          // toast.error("Unexpected error");
          setSnackbar({
            ...snackbar,
            status: true,
            text: "Unexpected error!",
            type: "error-toast",
          });
          hideSnackbar(setSnackbar);
        }
      }
    }
  };

  const setDetialsHandler = (e) => {
    console.log(
      e.target.name,
      "why password is getting as an empty",
      e.target.value
    );
    if (e.target.name !== "termsAndConditions")
      setDetials((prevCredentials) => ({
        ...prevCredentials,
        [e.target.name]: e.target.value,
      }));
    else
      setDetials((prevCredentials) => ({
        ...prevCredentials,
        [e.target.name]: e.target.checked,
      }));
  };

  return (
    <div className="auth-form">
      <h1>
        Spark Wind <GiWindSlap className="hero-icon" />
      </h1>
      <form onSubmit={submitSignupForm}>
        <center>
          <h2>Signup</h2>
        </center>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="name"
            name="firstName"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="name"
            name="lastName"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>User Name</label>
          <input
            type="text"
            placeholder="username"
            name="displayname"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>Email address</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            name="password"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            name="confirmPassword"
            onChange={setDetialsHandler}
          />
        </div>

        <div className="flex-H-center-V">
          <input
            type="checkbox"
            className="checkbox"
            name="termsAndConditions"
            onChange={setDetialsHandler}
          />
          <p>I accept all terms and conditions</p>
        </div>
        <button className="primary-cta" id="cta">
          Signup
        </button>
        <NavLink to="/login">
          <div className="account-info">
            <p>Already have an account</p>
            <MdOutlineKeyboardArrowRight className="icon" />
          </div>
        </NavLink>
      </form>
    </div>
  );
}
export { Login, Signup };
