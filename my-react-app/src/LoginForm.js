import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const submitForm = (e) => {
  e.preventDefault();
  console.log("Form submitted");

  // Replace with actual values from your form state

  if(email == "admin" && password=="admin@123"){
    navigate("/adminView")
  }
  else{
  axios.get('http://localhost:9090/validate', {
    params: {
      username : email,
      password : password
    }
  })
  .then(response => {
    if (response.data === true) {
      navigate('/ApplicationForm'); 
    } else {
      alert("Invalid username or password");
    }
  })
  .catch(error => {
    console.error("Validation failed: ", error);
    alert("Server error occurred");
  });

  }

};


  return (
    <>
      <nav>
        <form className="loginform" onSubmit={submitForm}>
          <div className="loginheading"><h1>Login</h1></div>

          <div className="loginlabel">
            <label>Username:</label>
            <input
            type="text"
            value={email}
            placeholder="Enter Username"
            className="logininput"
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="loginlabel">
            <label>Password:</label>
            <input
            type="password"
            value={password}
            placeholder="Enter Password"
            className="loginpassword"
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button  className="loginbutton">Login</button>
          <p className="loginphara">
          You don't have an account? <a href="/RegistrationForm"
          className="registercall"
          >Register</a>
          </p>
        </form>
      </nav>
    </>
  );
};

export default LoginForm;
