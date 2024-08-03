import mongosse from 'mongoose';

const userSchema = mongosse.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cartData:{type:Object, default:{}},
},{minimize:false});

const userModel = mongosse.models.user || mongosse.model('user', userSchema);

export default userModel;