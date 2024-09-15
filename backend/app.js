const express = require('express') ;
const mongoose = require('mongoose') ;
const path = require('path') ;
const PORT = 8000 ;
const cors = require('cors') ;
const app = express() ;
const url = "mongodb://localhost/CollegeDB" ;

mongoose.connect(url) ;

const con = mongoose.connection ;

con.on('open',() => {
    console.log("MongoDB connected...") ;
}) ;

app.use(cors()) ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:false}))

//regist routes

const registerRouter = require('./routes/registerRoutes') ;

app.use('/user', registerRouter);

//Login routes

const loginRouter = require('./routes/loginRegister') ;

app.use('/login', loginRouter);


app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`);
})
