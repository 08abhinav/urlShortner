import mongoose,{Schema} from "mongoose";

const urlSchema = new Schema({
    originalUrl:{
        type: String,
        unique: true,
        require: true
    },
    shortId:{
        type: String,
        unique: true,
        require: true
    },
    date:{
        type: Date,
        default:Date.now()
    },
    userIp:{
        type: String,
        require: true
    },
    userAgent:{
        type: String,
        require: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
}, {timestamps:true})

export const urlModel = mongoose.model("Url", urlSchema)
