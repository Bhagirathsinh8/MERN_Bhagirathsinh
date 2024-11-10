const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.send("Welcome to MERN Project Server Router JS");
    });
router.post('/registor',(req, res)=>{
    console.log(req.body);
    res.json({message:'Successfully'})
})

module.exports = router;