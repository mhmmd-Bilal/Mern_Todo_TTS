import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

const Users = mongoose.model("users", userSchema);

export default Users;


// [


//     {
//         _id : 'sdkjfskjdfsdfsd',
//         name : 'asdhakjsd',
//         email :'aksdasd',
//         password : 'sdhaksda',
//         matchPassword : (enteredPassword)=>{
//             enteredPassword === this.password
//         }
//     },
//     {
//         _id : 'sdkjfskjdfsdfsd',
//         name : 'asdhakjsd',
//         email :'aksdasd',
//         password : 'sdhaksda',
//         matchPassword : (enteredPassword)=>{
//             enteredPassword === this.password
//         }
//     }

// ]

