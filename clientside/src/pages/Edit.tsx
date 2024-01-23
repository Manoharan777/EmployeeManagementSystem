import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";
import e, { response } from "express";

const initialstate = {
  fname: "",
  lname: "",
  Uname: "",
  password: "",
  email: "",
  phn_no: "",
};

const Edit = () => {
  const [state, setState] = useState(initialstate);
  const { fname, lname, Uname, password, email, phn_no } = state;
  const navigate = useNavigate();
  const [userval, setUserval] = useState("");
  const [sucmsg, setSucmsg] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios         
      .get(`http://localhost:5000/api/get/${id}`) 
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  var letter = /[a-z]/;
  var upper = /[A-Z]/;
  var number = /[0-9]/;

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (!fname || !lname || !password || !email || !phn_no) {
      toast.error("Please provide value into each input field");
    }
    else if (phn_no.length != 10) {
      toast.error("Phone number must be 10 digits ");
    } else {   //http://localhost:5000/api/update/
      axios
        .put(`http://localhost:5000/api/update/${id}`, {
          fname,
          lname,
          password,
          email,
          phn_no,
        })
        .then((response) => {
          if (response.data.msg) {
            setUserval(response.data.msg);
          }
          else if(response.data.msgsuc){
            setSucmsg(response.data.msgsuc);
          }
        });

       setState({ fname: "", lname: "",Uname: "",password:"",email:"", phn_no: "" });

      toast.success("User Updated successfully");

      setTimeout(() =>navigate(-1), 2000);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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


  return (
    <div style={{ marginTop: "100px" }}>
      <form className="form" onSubmit={handleSubmit} action="#">
        <h2 style={{ fontWeight: "Bold" }}>Update Information</h2>
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
            value={fname || ""}
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
            value={lname || ""}
            onChange={handleInputChange}
          />
        </div>
        <label className="lab">Username</label>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            className="input-field"
            type="text"
            readOnly
            id="uname"
            name="Uname"
            placeholder="Username"
            required disabled
            value={Uname}
            onChange={handleInputChange}
          />
        </div>
        <label className="lab">Password</label>
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
            value={password || ""}
            onChange={handleInputChange}
          />
          <i className="fa fa-eye iconn" id="eye" onClick={passshow}></i>
        </div>
        <div id="message">
          <h3>Password must contain the following:</h3>
          <p id="letter" className="invalid">
            A <b>lowercase</b> letter
          </p>
          <p id="capital" className="invalid">
            A <b>capital (uppercase)</b> letter
          </p>
          <p id="number" className="invalid">
            A <b>number</b>
          </p>
          <p id="length" className="invalid">
            Minimum <b>8 characters</b>
          </p>
          <p id="special" className="invalid">
            A <b>special character</b>
          </p>
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
            value={email || ""}
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
            value={phn_no || ""}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Update" />
      
          <input
            type="button"
            value="Go Back" onClick={() =>navigate(-1) }
            style={{ backgroundColor: "RoyalBlue" }}
          />
        
      </form>
    </div>
  );
};

export default Edit;
