const dotenv = require('dotenv');
const mongoose = require('mongoose');  
const express = require('express');
const app = express();
const routes = require('./router/auth'); // Importing the routes

dotenv.config({path:"./config.env"})
require('./db/conn');
// const User = require('./models/userSchema');

app.use(express.json()); 
// we link router Files to Route here
app.use('/', routes);  // All routes in routes.js will be prefixed with '/'


const PORT = process.env.PORT

 

//Middleware ---------- create simple function and call function below same as middleware
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

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})
