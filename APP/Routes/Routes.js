let express = require("express");
const { signupinsert } = require("../Controller/SIgnupcontroller");
const logincheck = require("../Controller/Logincontroller");
const { findpass, forgotpassword } = require("../Controller/Forgotpasswordcontroller");
const { notesinsert, notesdelete, searchnotes, updatenotes } = require("../Controller/Notescontroller");
let routes = express.Router();
module.exports = routes;




routes.post('/signup',signupinsert)
routes.post('/login',logincheck)
routes.post('/findpass',findpass)
routes.put('/forgotpassword',forgotpassword)



routes.post('/notesinsert',notesinsert)
routes.delete('/notesdelete/:id',notesdelete)
routes.post('/notessearch/:id',searchnotes)
routes.put('/notesupdate/:id',updatenotes)


