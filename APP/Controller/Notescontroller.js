
const notesmodel = require("../Model/Usernotesmodel")

let notesinsert=(req,res)=>{
    let { title, description } = req.body

    let insertnotes = new notesmodel({
        title,
         description
    })
    insertnotes.save().then(() => {

        res.send({ status: 1, message: "insertnotes" })
    }).catch((err) => { res.send({ status: 0, msg: err }) })



}
 
let notesiew=async(req,res)=>{
    let data=await notesmodel.find();
    res.send({status:1,data:data})

}

let notesdelete=async(req,res)=>{
    let iddd=req.params.id
    let deletenotes=await notesmodel.deleteOne({_id:iddd})
    res.send({status:2,message:"delete",dres:deletenotes})
}

let searchnotes=async(req,res)=>{
    let iddd=req.params.id
    let {title, description}=await notesmodel.findOne({_id:iddd})
    let obj={title, description}
    res.send({status:1,message:"search note sucessfully",res:obj})
}
let updatenotes=async(req,res)=>{
    let iddd=req.params.id
    let {title, description}=req.body
    
    let updateobj={
        title, description
    }
    let updatenotes=await enquirymodel.updateOne({_id:iddd},updateobj)
    res.send({status:1,message:"updated data sucessfully",res:updatenotes})
}

module.exports={notesinsert,notesdelete,notesiew,searchnotes,updatenotes}