import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import fp from "./forgotpass.png";
import { toast } from "react-toastify";
import axios from "axios";
import swal from 'sweetalert';

const initialstate = {
  phn_no: "",
  password: "User@12345",
  request:"Password change"
};

const Fpassword = () => {
  const [state, setState] = useState(initialstate);
  const phn_no = state;
  const [loginstatus, setLoginstatus] = useState("");
  const [sucmsg, setSucmsg] = useState("");
  const [contact, setContact] = useState("");
  var [password, setPassword] = useState("User@12345");
  var [request, setRequest] = useState("Password change");
  const navigate = useNavigate();

  const handlecontact = () => {
    if (!phn_no) {
      toast.error("Enter contact number");
    } else {
      axios
        .post("http://localhost:5000/fpassword", {
          phn_no: contact,
        })
        .then((response) => {
          if (response.data.message) {
            setLoginstatus(response.data.message);
          } else {
            swal({
              title: "Your Request has been submitted!",
              text: "Admin can reset your password to Default = User@12345.",
              icon: "success",
            });
            axios
              .put(
                `http://localhost:5000/api/requestpass/${contact}`,
                request
              )
              .catch((error) => toast.error(error.response.data));
            setRequest(() => "Password change");
              navigate("/")
          }
        });
    }
  };

  return (
    <div>
      <form className="form">
        <h2>Password Reset</h2>
        <img src={fp} alt="user" />
        <br />
        <br />

        <label className="lab">Contact No</label>
        <br />
        <br />
        <div className="input-container">
          <i className="fa fa-phone icon"></i>
          <input
            className="input-field"
            type="number"
            id="phn_no"
            name="phn_no"
            placeholder="(9876543210)"
            required
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
        </div>

        <h4 style={{ color: "red" }}>{loginstatus}</h4>
        <h4 style={{ color: "green" }}>{sucmsg}</h4>
        <input type="button" value="Request" onClick={handlecontact} />
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

export default Fpassword;