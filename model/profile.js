import mongoose from 'mongoose';


const profileSchema =  new mongoose.Schema({
    userId:{
        type:String,
    },
    name:{
        type:String,
        require:true,
    },
    contact:{
        type:Number,
        minlength:10,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
})

const Profile = mongoose.model("profile", profileSchema);

export default Profile;