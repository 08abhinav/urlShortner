import mongoose from "mongoose";

export function dbConnect(url){
    return mongoose.connect(url)
}
