var mongoose=require('mongoose')

var userSchema=mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    journey: [{type: mongoose.Schema.Types.ObjectId, ref: 'journey'}]
});

var userModel = mongoose.model('user', userSchema);

module.exports=userModel;
