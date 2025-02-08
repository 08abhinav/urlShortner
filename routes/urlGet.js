import express from "express"
import { urlModel } from "../models/urls.js"
import { restricTo } from "../middleware/authentication.js"

const urlGet = express.Router()


// urlGet.get("/admin", restricTo['ADMIN'], async (req, res)=>{
//     const allUrl = await urlModel.find({})
//     return res.render("allUrl", {urls: allUrl})
// })

// urlGet.get("/", restricTo(["NORMAL", "ADMIN"]), async(req, res)=>{
//     const allurls = await urlModel.findOne({createdBy: req.user._id})
//     return res.render("home", {url: allurls})
// })

export default urlGet;
