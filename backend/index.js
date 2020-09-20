const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { logging } = require("./log");
const postDataValidate = require("./log_validation");

app.use(cors());
app.use(express.json());

//Routes//

//create blog//
app.post("/postblog", async (req, res) => {
  let retries = 1;
  while (retries <= 5) {
    const { user_id, post_id, post_name, post_type, post_data ,userName } = req.body;
    try {
      
      postDataValidate(req.body);
      if (post_id != null && user_id != null) {
        const postData = await pool.query("INSERT INTO blog (user_id,post_id,post_name,post_type,post_data) VALUES($1,$2,$3,$4,$5) RETURNING *", [user_id, post_id, post_name, post_type, post_data]);
        logging("post id : " + post_id + " has been posted by user :" + user_id +" "+ userName);

        res.send(postData.rows[0]);
        break;
      }

    } catch (error) {
      //console.log(error);
      retries += 1;
      //console.log("retreis left " + retries);
      //wait for 5 seconds
      await new Promise(res => setTimeout(res, 5000));

      logging("user id: " + user_id + " tried to post a blog with post id: " + post_id + "but failed : Error " + retries + " try :" + error, true);
    }
  }
});

// app.get("/getblog/",async(req,res)=>{
//     try{
//         const postAll = await pool.query("SELECT * FROM blog");
//         //console.log(req.params);
//         res.json(postAll.rows);
//     }catch (er){
//         console.log(er.message);
//     }
// });

//update put method
app.put("/updateblog/:id/:userName/:user_id", async (req, res) => {
  let retries = 5;
  while (retries) {
    try {
      const { id ,userName ,user_id} = req.params;
      const { post_data } = req.body;
      //console.log("--------" + post_data + ",id" + id);
      const updatePost = await pool.query(
        "UPDATE blog SET post_data = $1 WHERE post_id = $2",
        [post_data, id]
      );

      logging(" UPDATE :: post id : " + id + " has been updated by user :" + user_id +" => "+userName);
      res.send("Updated");
      break;
    } catch (err) {
      //console.error(err.message);
      retries -= 1;
      logging(" UPDATE ERROR :: " + err.message, true);
      //console.log("retries left " + retries);
    }
  }

});

//get method :: login
app.get("/loggedin/:authenticate",(req,res)=>{
  const { authenticate } = req.params;
  logging(" GET :: " + "Logged In : " + authenticate);
  res.send("succefully logged in "+authenticate);
});

//get method :: logout
app.get("/logout/:authenticate",(req,res)=>{
  const { authenticate } = req.params;
  logging(" GET :: " + "logout  : " + authenticate);
  res.send("succefully logout "+authenticate);
});


//get method
app.get("/getblog/:subject", async (req, res) => {
  let retries = 5;
  while (retries) {

    try {
      const { subject } = req.params;
      const postAll = await pool.query("SELECT * FROM blog WHERE post_type =$1", [subject]);
      //console.log("param",req.params);
      //console.log(postAll.rows);
      logging(" GET :: " + "posted : " + postAll.rows.map((v) => { return v.post_id }) + " Type: " + subject);
      res.json(postAll.rows);
      break;
    } catch (err) {
      //console.log(er.message);
      retries -= 1;
      logging("GET ERROR :: " + err.message, true);
      //console.log("retries left " + retries);
    }
  }
})
//delete method
app.delete("/deleteblog/:id/:userName", async (req, res) => {
  let retries = 5;
  while (retries) {
    try {
      //console.log(req.params);
      const { id, userName } = req.params;
      const deletePost = await pool.query("DELETE FROM blog WHERE post_id = $1", [
        id
      ]);
      //console.log("deleted " + id);
      logging(" DELETED :: " + "post : " + id + " Deleted : "+userName );
      res.send(id + " was deleted!");
      break;
    } catch (err) {
      //console.log(err.message);
      retries -= 1;
      logging("DELETE ERROR :: " + err.message, true);
      //console.log("retries left " + retries);
    }
  }

});


app.listen(5001, () => {
  //console.log("port 5001 runningsss");
});