var mongoose=require('mongoose')

var userSchema=mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

var userModel = mongoose.model('user', userSchema);

module.exports=userModel;
