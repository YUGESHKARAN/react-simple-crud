const express = require('express') ;
const router = express.Router() ;
const User = require('../models/userRegisterSchema') ;
const bcrypt = require('bcrypt') ; 

router.post('/', async (req,res) => {

    try{

        const {email, password} = req.body ;
        const user = await User.findOne({email});

        if(!user){
          return  res.status(400).json({message:"Invalid Email"}) ;
        }
        
        const isMatch = await user.comparePassword(password) ;
        
        if(!isMatch){
           return res.status(400).json({message:"Invalid Password"}) ;
        }

        res.status(200).json({message:"Login Successfull",user}) ;

    }
    catch(err){

     res.send("Error" + err) ;

    }
})

module.exports = router ;