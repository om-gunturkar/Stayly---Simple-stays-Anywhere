const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("Hii I am root")
})
//POSTS
//Index – users
app.get("/users/", (req, res) => {
  res.send("GET for users post");
});
//Show – users
app.get("/users/:id", (req, res) => {
  res.send("GET for users id");
});
//POST – users
app.post("/users", (req, res) => {
  res.send("Post for users");
});

//DELETE – users
app.delete("/users/:id", (req, res) => {
  res.send("Delete for users id");
});



app.listen(3000,()=>{
console.log("Server is listening to 3000");

})