import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialstate = {
  fname: "",
  lname: "",
  Uname: "",
  password: "",
  cpassword: "",
  email: "",
  phn_no: "",
  role: "Employee",
  modified: "",
};

const Register = () => {
  const [state, setState] = useState(initialstate);
  const { fname, lname, Uname, password, cpassword, email, phn_no } = state;
  const [role, setRole] = useState("Employee");
  const [userval, setUserval] = useState("");
  const [sucmsg, setSucmsg] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
  
    if (isSubmitting) {
      // Do not submit the form if already submitting
      return;
    }
  
    setSubmitting(true);
  
    if (
      !fname ||
      !lname ||
      !Uname ||
      !password ||
      !cpassword ||
      !email ||
      !phn_no ||
      !role
    ) {
      toast.error("Please provide a value for each input field");
      setSubmitting(false);
    } else if (password !== cpassword) {
      toast.error("Passwords do not match");
      setSubmitting(false);
    } else if (phn_no.length !== 10) {
      toast.error("Mobile number must be 10 digits");
      setSubmitting(false);
    } else {
      axios.post("http://localhost:5000/api/post", {
        fname,
        lname,
        Uname,
        password,
        email,
        phn_no,
        role,
      })
      .then((response) => {
        console.log("Response from server:", response.data);
        if (response.data.msg) {
          setUserval(response.data.msg);
          console.log("Post data error:", response.data.msg);
          toast.error(response.data.msg);
        } else if (response.data.msgsuc) {
          setSucmsg(response.data.msgsuc);
          toast.success(response.data.msgsuc);
        }
      })
      .catch((error) => {
        console.error("Error during API call:", error);
        toast.error("An error occurred during registration. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  
      toast.success("User Registered Successfully");
      setTimeout(() => navigate("/"), 3000);
    }
  };
  
  const handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const passshow = () => {
    var x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  var myInputuser = document.getElementById("uname") as HTMLInputElement;
  var userlength = document.getElementById("userlen") as HTMLInputElement;

  var myInput = document.getElementById("password") as HTMLInputElement;
  var letter = document.getElementById("letter") as HTMLInputElement;
  var capital = document.getElementById("capital") as HTMLInputElement;
  var number = document.getElementById("number") as HTMLInputElement;
  var length = document.getElementById("length") as HTMLInputElement;
  var splchar = document.getElementById("special") as HTMLInputElement;

  myInput.onfocus = function () {
    (document.getElementById("message") as HTMLInputElement).style.display =
      "block";
  };
  myInput.onblur = function () {
    (document.getElementById("message") as HTMLInputElement).style.display =
      "none";
  };

  myInputuser.onfocus = function () {
    (document.getElementById("messageuser") as HTMLInputElement).style.display =
      "block";
  };
  myInputuser.onblur = function () {
    (document.getElementById("messageuser") as HTMLInputElement).style.display =
      "none";
  };

  myInputuser.onkeyup = function () {
    if (myInputuser.value.length >= 6) {
      userlength.classList.remove("invalid");
      userlength.classList.add("valid");
    } else {
      userlength.classList.remove("valid");
      userlength.classList.add("invalid");
    }
  };
  myInput.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
    var specials = /[*,&,%,-,#,$,@,!]/g;
    if (myInput.value.match(specials)) {
      splchar.classList.remove("invalid");
      splchar.classList.add("valid");
    } else {
      splchar.classList.remove("valid");
      splchar.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRole(event.target.value);
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit} action="#">
        <h2 style={{ fontWeight: "Bold" }}>Registration Form</h2>
        <br /> <h4 style={{ color: "red" }}>{userval}</h4>
        <h4 style={{ color: "green" }}>{sucmsg}</h4>
        <br />
        <br />
        <label className="lab">First Name</label>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            className="input-field"
            type="text"
            id="fname"
            name="fname"
            placeholder="First Name"
            required
            value={fname}
            onChange={handleInputChange}
          />
        </div>
        <label className="lab">Last Name</label>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            className="input-field"
            type="text"
            id="lname"
            name="lname"
            placeholder="Last Name"
            required
            value={lname}
            onChange={handleInputChange}
          />
        </div>
        <label className="lab">Username</label>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            className="input-field"
            type="text"
            id="uname"
            name="Uname"
            placeholder="Username"
            pattern=".{6,}"
            title="Must contain at least 6 or more characters"
            required
            value={Uname}
            onChange={handleInputChange}
          />
        </div>
        <div id="messageuser">
          <p id="userlen" className="invalid">
            Minimum <b>6 characters</b>
          </p>
        </div>
        <label className="lab" htmlFor="password">
          Password
        </label>
        <div className="input-container">
          <i className="fa fa-key icon"></i>
          <input
            className="input-field"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[*,&,%,-,#,$,@,!])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter and one special character, and at least 8 or more characters"
            required
            value={password}
            onChange={handleInputChange}
          />
          <i className="fa fa-eye iconn" id="eye" onClick={passshow}></i>
        </div>
        <div id="message">
          <h3>Password must contain the following:</h3>
          <p id="letter" className="invalid">
            A <b>lowercase</b> letter
          </p>
          <br />
          <p id="capital" className="invalid">
            A <b>Uppercase</b> letter
          </p>
          <br />
          <p id="number" className="invalid">
            A <b>number</b>
          </p>
          <br />
          <p id="special" className="invalid">
            A <b>special character</b>
          </p>
          <br />
          <p id="length" className="invalid">
            Minimum <b>8 character</b>
          </p>
          <br />
        </div>
        <label className="lab" htmlFor="cpassword">
          Confirm Password
        </label>
        <div className="input-container">
          <i className="fa fa-key icon"></i>
          <input
            className="input-field"
            type="password"
            id="password"
            name="cpassword"
            placeholder="Confirm Password"
            required
            value={cpassword}
            onChange={handleInputChange}
          />
        </div>
        <label className="lab">E-Mail</label>
        <div className="input-container">
          <i className="fa fa-envelope icon"></i>
          <input
            className="input-field"
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <label className="lab">Contact No</label>
        <div className="input-container">
          <i className="fa fa-phone icon"></i>
          <input
            className="input-field"
            type="number"
            id="phn_no"
            name="phn_no"
            placeholder="(9876543210)"
            required
            value={phn_no}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Role: </label>

          <select value={role} onChange={handleChange}>
            <option value="Employee">Employee</option>

            <option value="Admin">Admin</option>
          </select>
        </div>
        <input type="submit" value="Submit" />
        <Link to="/">
          <input
            type="button"
            value="Go Back"
            style={{ backgroundColor: "RoyalBlue" }}
          />
        </Link>
      </form>
    </div>
  );
};

export default Register;
