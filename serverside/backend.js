import express, { response } from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import mysql from 'mysql2';
import { count } from "console";

// //local db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "employee_crud",
  });

//  Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
  
//   // You can perform additional operations here
//   // Close the connection when done
//   db.end((err) => {
//     if (err) {
//       console.error('Error closing MySQL connection:', err);
//       return;
//     }
//     console.log('Connection closed');
//   });
// });

app.use(express.json());
app.use(cors({
 origin: ["http://localhost:3000"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));


//get
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM emp_management"; 
    db.query(sqlGet, (error, result) => {
     // console.log(result);
      res.send(result);
    });
  }); 





//delete data from db
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlremove = "DELETE from emp_management WHERE id = ?";
    db.query(sqlremove, id, (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  });


//posting data to db
app.post("/api/post", (req, res) => {
    const { fname, lname, Uname, password, email, phn_no,role } = req.body;
      const sqlcheck = "SELECT * FROM emp_management WHERE Uname=?  ";
      db.query(sqlcheck, Uname, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          const sqlInsert =
            "INSERT INTO emp_management (fname,lname,Uname,password, email, phn_no,role) VALUES (?, ?, ?,?,?,?,?)";
          db.query(
            sqlInsert,
            [fname, lname, Uname, password, email, phn_no,role],
            (error, result) => {
              if (error) {
                console.log(error);
                if (error.message.includes(Uname)) {
                  res.send({ msg: "Username has been taken.Try something new " });
                } else if (error.message.includes(phn_no)) {
                  res.send({ msg: "Contact has been taken.Try something new " });
                } else if (error.message.includes(email)) {
                  res.send({ msg: "E-mail has been taken.Try something new " });
                }
              } else {
                res.send({ msgsuc: "Registered Successfull " });
              }
            }
          );
        }
      });
});

//editpage get existing data on particular id
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM emp_management WHERE id=?";
    db.query(sqlGet, id, (error, result) => {
      if (error) {
        console.log(error);
      }
  
      res.send(result);
      //console.log(result);
    });
  });

  //update
app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { fname, lname, password, email, phn_no } = req.body;
      const sqlUpdate =
        "UPDATE emp_management SET fname=?,lname=?,password=?, email=?, phn_no=? WHERE id=?";
      db.query(
        sqlUpdate,
        [fname, lname, password, email, phn_no, id],
        (error, result) => {
          if (error) {
            console.log(error);
            if (error.sqlMessage.includes(email)) {
              res.send({ msg: "E-mail has been taken.Try something new " });
            } else if (error.sqlMessage.includes(phn_no)) {
              res.send({ msg: "Contact has been taken.Try something new " });
            }
          } else {
            res.send({ msgsuc: "Updated Successfully " });
          }
        }
      );
    });

    // uname and password exist in the db for login
    app.post("/login", (req, res) => {
        const { Uname, password } = req.body;
        const sqlcheck = "SELECT * FROM emp_management WHERE Uname=?";
        
        db.query(sqlcheck, Uname, (error, result) => {
          if (error) {
            res.status(500).json({ error: error });
          } else if (result.length > 0) {
            // Compare the entered password with the stored password directly
            if (password === result[0].password) {
             // req.session.user = result;
             // console.log(req.session.user);
              res.status(200).json(result);
            } else {
                res.send({ message: "Invalid Username/Password" });
            }
          } else {
            res.send({ message: "User doesn't exist" });
          }
        });
      });
      
      //update status to Deactive
app.put("/api/statusD/:id", (req, res) => {
    const { id } = req.params;
    var status = "Deactive";
    const sqlUpdate = "update emp_management set status =?  where id=?";
    db.query(sqlUpdate, [status, id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });
  
  //update status to Active
  app.put("/api/statusA/:id", (req, res) => {
    const { id } = req.params;
    var status = "Active";
    const sqlUpdate = "update emp_management set status =?  where id=?";
    db.query(sqlUpdate, [status, id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });


//exist phn_no in the db for reset passowrd.
app.post("/fpassword", (req, res) => {
    const { phn_no } = req.body;
  
    const sqlcheck = "SELECT  * FROM emp_management WHERE phn_no=? ";
    db.query(sqlcheck, phn_no, (error, result) => {
      if (error) {
        res.send({ error: error });
      }
      if (Array.isArray(result) && result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Contact does not exist" });
      }
    });
  });


  app.put("/api/resetpassword/:id", (req, res) => {
    const { id } = req.params;
    var password = "User@12345";
      const sqlUpdate = "update emp_management set password=? where id=?";
      db.query(sqlUpdate, [password, id], (error, result) => {
        if (error) {
          console.log(error);
        }
        res.send(result);
      });
    });

//password reset request call
app.put("/api/requestpass/:phn_no", (req, res) => {
    const { phn_no } = req.params;
    var request = "Password change";
  
      const requestput = "update emp_management set request=? where phn_no=?";
      db.query(requestput, [request, phn_no], (error, result) => {
        if (error) {
          console.log(error);
        }
        res.send(result);
      });
    
  });

  //change request to empty
app.put("/api/requestpasstodel/:id", (req, res) => {
    const { id } = req.params;
    var request = "";
  
      const requestput = "update emp_management set request=? where id=?";
      db.query(requestput, [request, id], (error, result) => {
        if (error) {
          console.log(error);
        }
        res.send(result);
      });
    
  });


  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
  