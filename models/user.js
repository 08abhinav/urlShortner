import mongoose, {model, Schema} from "mongoose";
import bcrypt from 'bcrypt';
import { createToken } from "../services/authorization.js";

const userSchema = new Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, {timestamps: true})


userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified('password')) return;

    const saltRounds = 10 // it is salt rounds(means the number of times bcrypt perform to hashed the password)
    const hashedPassword = await bcrypt.hash(this.password, saltRounds)

    this.password = hashedPassword
    next();
})


userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
    const user = await this.findOne({email})
    if(!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) throw new Error("Incorrect password");

    const token = createToken(user)
    return token
})

export const User = new mongoose.model("Users", userSchema) 
