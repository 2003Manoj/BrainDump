let express= require("express");
let mongoose=require("mongoose");
let cors = require('cors');
require("dotenv").config();
const routes = require("./App/Routes/Routes")
let app=express();
app.use(express.json())
app.use(cors())
app.use('/notes/api/',routes)
//dbconnect
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connected")
app.listen(process.env.PORT)
}).catch((err)=>{
    console.log(err)
})
