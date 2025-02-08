import mongoose from "mongoose";

export const PORT = 6969;

export function dbConnect(url){
    return mongoose.connect(url)
}
