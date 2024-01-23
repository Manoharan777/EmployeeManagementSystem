import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import e, { response } from "express";
import swal from 'sweetalert';
interface form {
  id: number;
  fname: string;
  lname: string;
  Uname: string;
  email: string;
  phn_no: number;
  status: string;
  request:string;
  password:string;
}

const Admimhome = () => {
  const [data, setData] = useState<Array<form>>([]);
  const [filterval, setFilterval] = useState("");
  const [searchapidata, setSearchapidata] = useState<Array<form>>([]);
  const [stfil, seStfil] = useState("");
  const [searchfilter, setSearchfilter] = useState<Array<form>>([]);
  const navigate = useNavigate();
  var [password, setPassword] = useState("User@12345");
  var [request, setRequest] = useState("");
  var [status, setStatus] = useState("Active" || "Deactive");
  const [checked, setChecked] = useState(true);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
    setSearchapidata(response.data);
    setSearchfilter(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deletecontact = (id: number,fname:string) => {
    if (window.confirm("Are you sure that you want to delete that user ?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      swal({
        title: `${fname}'s account deleted successfully`, 
        icon: "success",
      });
      setTimeout(() => loadData(), 500);
    }
  };


  //update status to Deactive
  const StatusupdationD = (id: number) => {
    axios
      .put(`http://localhost:5000/api/statusD/${id}`, status)
      .catch((error) => toast.error(error.response.data));
    setStatus((status) => "Deactive");
    setTimeout(() => loadData(), 50);
  };

  //update status to Active
  const StatusupdationA = (id: number) => {
    axios
      .put(`http://localhost:5000/api/statusA/${id}`, status)

      .catch((error) => toast.error(error.response.data));
    setStatus((status) => "Active");
setTimeout(() => loadData(), 50);
    
  };

  // search functionality
  const handlefilter = (e: any) => {
    if (e.target.value == "") {
      setData(searchapidata);
    } else {
      const filterresult = searchapidata.filter(
        (item) =>
          item.fname.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.lname.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.phn_no.toString().includes(e.target.value.toLowerCase())
      );
      if (filterresult.length > 0) {
        setData(filterresult);
      } else {
        setData([]);
      }
    }
    setFilterval(e.target.value);
  };

  //status filter functionality
  const statusfilter = (e: any) => {
    if (e.target.value == "") {
      setData(searchfilter);
    } else {
      const filtstatresult = searchfilter.filter((item) =>
        item.status.includes(e.target.value.toUpperCase())
      );
      setData(filtstatresult);
    }
    seStfil(e.target.value);
  };

  //back to logout

  const logout = () => {
    setTimeout(() => navigate("/"), 500);
  };

  const changereq = (id:number,fname:string) => {
       axios.put(`http://localhost:5000/api/resetpassword/${id}`,
                password
              )
              .catch((error) => toast.error(error.response.data));
            setPassword(() => "User@12345");
            swal({
              title: `${fname}'s password has been set to default password`, 
              icon: "success",
            });
            axios.put(`http://localhost:5000/api/requestpasstodel/${id}`,
            request
          )
          .catch((error) => toast.error(error.response.data));

        setRequest(() => "");
        setTimeout(() => loadData(), 50);
  }

  return (
    <div>
        <h2>Admin page</h2>
      <div>
        <i className="fa fa-search icon">
      
          Search
          <input
            type="search"
            className="search"
            placeholder="Fname,Lname,Contact no"
            value={filterval}
            onInput={(e) => handlefilter(e)}
          />
        </i>
      </div>
      <br />
      <br />
      <div>
        <i className="fa fa-filter icon">
      
          Filter By Status :
          <input
            type="search"
            className="searchFilter"
            placeholder=" A / D"
            value={stfil}
            onInput={(e) => statusfilter(e)}
          />
        </i>
      </div>

      <button className="btnn btn-logout" onClick={logout}>
        Log out
      </button>
      &nbsp;

     
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th style={{ textAlign: "center" }}>First Name</th>
            <th style={{ textAlign: "center" }}>Last Name</th>
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact Number</th>
            <th style={{ textAlign: "center" }}>Action</th>
            <th style={{ textAlign: "center" }}> Status</th>
            <th style={{ textAlign: "center" }}>Admin Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.Uname}</td>
                <td>{item.email}</td>
                <td>{item.phn_no}</td>
                <div className="btnalign">
                  <Link to={`/update/${item.id}`}>
                    <button className="actionbtn-e">
                     
                      <i className="fa fa-edit icon-e"></i>
                    </button>
                  </Link>
                  <br />
                  <button
                    className="actionbtn-d"
                    onClick={() => deletecontact(item.id,item.fname)}
                  >
                    <i className="fa fa-trash icon-d"></i>
                  </button>
                </div>
    
               
                <td>{item.status}</td>
                <td>
                <button
                  className="btnn btn-deactived" 
                  onClick={() => StatusupdationD(item.id)}
                >
                  Deactivate
                </button>
                <button
                  className="btnn btn-actived" 
                  onClick={() => StatusupdationA(item.id)}
                >
                  Activate
                </button>
                <br/>
                <td><a href="#" onClick={() => changereq(item.id,item.fname)}>{item.request}</a></td>
                
                    </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
// export default withRouter( Home);
export default Admimhome;
