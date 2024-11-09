const mongoose = require('mongoose');  
const express = require('express');
const app = express();

const DB = "mongodb+srv://bhagirathnakum8:nakum7773@cluster0.vhzex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB).then(()=>{
    console.log("Connected Successfully");
}).catch((err) => console.log("No connection"+ err));


//Middleware 
//create simple function and call function below same as middleware
const middleware = (req,res,next) =>{
console.log("My Middleware");
next();
}
// middleware()


app.get('/',(req, res)=>{
res.send("Welcome to MERN Project");
});

app.get('/about',middleware,(req, res)=>{
    console.log("About Page Of MERN Project");
    res.send("Welcome to About Page Of MERN Project");
})
app.get('/contact',(req, res)=>{
    console.log("Contact Page Of MERN Project");
    res.send("Welcome to Contact Us Page Of MERN Project");
})

app.get('/signin',(req, res)=>{
    res.send("Welcome to Login Page Of MERN Project");
})
app.get('/signup',(req, res)=>{
    res.send("Welcome to Regisration page Of MERN Project");
})

app.listen(3000,()=>{
    console.log("Server listening on port 3000")
})
