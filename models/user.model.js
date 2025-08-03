import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { JsonWebTokenError } from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowecase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowecase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudinary image url
            required:true
        },
        coverimage:{
            type:String   //cloudinary image url
        },
        watchHistory:[    //here we are storing the video id which user has watched
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"password is required"],
            minlength:6,
            unique:true
        },
        refreshToken:{
            type:String
        },
    },{timestamps:true} 

)

//before save we will check this thing these are also middleware
userSchema.pre("save", async function(next){
    if(!this.modified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next();
})

//we can create our own method to check weather the given password and the bcrypted password are same or not
userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
     return jwt.sign(
        {                //these are payload
        _id: this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET
        , 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {                //these are payload
        _id: this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET
        , 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )}

export const user = mongoose.model('User', userSchema);