var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
    name: {type: String, required:true,max: 100},
    message: {type:String, required:true,max: 1000},
    email:{type:String, required:true,max: 100}
})

module.exports = mongoose.model("Message",MessageSchema);