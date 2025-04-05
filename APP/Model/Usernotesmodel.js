let mongoose = require('mongoose');  
let NotesSchema = new mongoose.Schema({
    title:{type: String,
        required: true
    },
  
    description:{type: String,
        required: true,
       
    },
});
let notesmodel = mongoose.model('NotesDetails', NotesSchema);
module.exports = notesmodel;;