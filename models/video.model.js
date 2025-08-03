import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
        videoFile:{
            type:String,     //cloudinary video url
            required:true 
        },
        thumbnail:{
            type:String,     //cloudinary video url
            required:true     
        },
        title:{
            type:String,     
            required:true
        },
        description:{
            type:String,     
            required:true
        },
        duration:{
            type:Number,     //in seconds
            required:true
        },
        views:{
            type:Number,     
            default:0
        },
        isPublished:{
            type:Boolean,     
            default:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },{timestamp:true}
)

videoSchema.plugin(mongooseAggregatePaginate);   //these are aggregate pipelines 

export const video = new mongoose.model('video',videoSchema)