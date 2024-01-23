import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './view.css';
interface form {
    id: number;
    name?: string;
    email?: string;
    contact? : string;
  }

const View = () => {
    const [user, setUser] = useState({});
    const {id } = useParams();
    useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`)
    .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);
    return(
    <div style={{ marginTop: "150px" }}>
    <div className="card">
    <div className="card-header">
    <p>User Contact Detail</p>
    </div>
    <div className="container">
    <strong>ID: </strong>
    <span>{id}</span>
    <br />
    <br />
  
    <link>
    <div className='btn btn-edit'>Go back</div>
    </link>
    </div>
    </div>
    </div>
    );
};

export default View;