import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import user from "./userl.png";
import { toast } from "react-toastify";
import axios from "axios";
import { response } from "express";
import Swal from 'sweetalert2'

function Login() {
  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [loginstatus, setLoginstatus] = useState("");
  const [sucmsg, setSucmsg] = useState("");
  //const [attempt, setAttempt] = useState("");
  const navigate = useNavigate();
   var count = 0;
 axios.defaults.withCredentials = true;
  //remember me feature
  // const setCookie = () => {
  //   var u = (document.getElementById("uname") as HTMLInputElement).value;
  //   var p = (document.getElementById("password") as HTMLInputElement).value;
  //   document.cookie = "myusername=" + u + ";path = http://localhost:3000/";
  //   document.cookie = "mypassword=" + p + ";path = http://localhost:3000/";
  // };

  // var getCookiedata = () => {
  //   //console.log(document.cookie);

  //   var users = getCookie("myusername");
  //   var pwd = getCookie("mypassword");

  //   (document.getElementById("uname") as HTMLInputElement).value = users;
  //   (document.getElementById("password") as HTMLInputElement).value = pwd;
  // };

  var getCookie = (cname: any) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  var usercook = getCookie("myusername");
  var pwdcook = getCookie("mypassword");
  console.log(usercook, pwdcook);
 




  const handlelogin = () => {
    axios
      .post("http://localhost:5000/login", { 
        Uname: username,
        password: Password,
      })
      .then((response) => {
        if (response.data.message) {
          count++;
         
          setLoginstatus(response.data.message);
     
          if(count >= 3){
            
            Swal.fire({
              icon: 'error',
              title: 'Password attempt execced',
              text: 'Maximum attempt 3 times reached!',

              footer: '<a href="/fpassword">To Reset a default password?</a>'
            })
            
          }
        } else if(response.data[0].role=="Employee") {
        //  authenticate();

          //setLoginstatus(response.data[0].fname);

          toast.success("Employee Logged-In successfully");
         navigate("/homepage");
        }
        
          else {
          if(response.data[0].role == "Admin")
        //authenticate();
        toast.success("Admin Logged-In successfully");
        navigate("/adminhome")
          }
      });
  };

// useEffect(() => {
//   axios.get("http://localhost:5000/login").then((response) =>{
//     if(response.data.loggedIn == true){
//       setSucmsg(response.data.user[0].fname);
//        navigate("/homepage");
//     }
   
   
//   })
// },[])



  const passshow = () => {
    var x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div>
      <form className="form">
        <h2>Login Form</h2>
        <img src={user} alt="user" />
        <br />
        <h4 style={{ color: "red" }}>{loginstatus}</h4>
        <h4 style={{ color: "green" }}>{sucmsg}</h4>
        <br />
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            className="input-field"
            type="text"
            id="uname"
            name="Uname"
            //value={Uname}
            placeholder="Username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="input-container">
          <i className="fa fa-key icon"></i>
          <input
            className="input-field"
            type="password"
            id="password"
            //value={p}
            name="password"
            placeholder="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <i className="fa fa-eye iconn" id="eye" onClick={passshow}></i>
        </div>
        {/* <h6 style={{ color: "red" }}>{attempt}</h6> */}
        <div className="remember">
          <input
            type="checkbox"
            name="rememberme"
            id="rememberme"
           // onClick={setCookie}
          />
          <span>Remember me</span>
        </div>
        <p style={{ marginLeft: "230px" }}>
          <Link to="/fpassword">Forgot passord?</Link>
        </p>
        <br />
        <br />

        <input type="button" value="Login" onClick={handlelogin} />

        <Link to="/register">
          <input
            type="button"
            value="Register"
            style={{ backgroundColor: "RoyalBlue" }}
          />
        </Link>
      </form>
    </div>
  );
}
export default Login;
