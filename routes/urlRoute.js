import express from "express"
import { handleGetAllUrls, handleGetShortUrl, handleUrlCreation } from "../controllers/url.js"

const urlRoute = express.Router()

urlRoute.get("/", (req, res)=>{
    return res.render("urlCreate",{
        user: req.user
    })
})

urlRoute.get("/allurls", handleGetAllUrls)
urlRoute.post("/", handleUrlCreation)
urlRoute.get("/:shortId", handleGetShortUrl)



export default urlRoute;
