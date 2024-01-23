import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Login from "./pages/login";
import Fpassword from "./pages/forgotpassword";
import Admimhome from "./pages/Adminhome";

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <h1>Employee Management System</h1>

          <ToastContainer position="top-center" />
          <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/fpassword" element={<Fpassword />} />
                <Route path="/homepage" element={<Home />} />
                <Route path="/adminhome" element={<Admimhome />} />
                <Route path="/update/:id" element={<Edit />} />
                <Route  path='/' element={<Login/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
