import {urlModel} from "../models/urls.js"
import { nanoid } from "nanoid"

export async function handleGetCreationPage(req, res){
    return res.render("urlCreate")
}

export async function handleUrlCreation(req, res){
    try {
        const {originalUrl} = req.body
        const userAgent = req.get("User-Agent")
        const userIp = req.ip;

        // if(!body.url) return res.json({"message": "url is required"});
        const shortId = nanoid(8);
        await urlModel.create({
            originalUrl: originalUrl,
            shortId: shortId,
            userIp: userIp,
            userAgent: userAgent,
            createdBy: req.user._id
        })
        return res.render("home", {id: shortId, url:originalUrl, user: req.user})

    } catch (error) {
        return res.json({"message": error.message})
    }
}

export async function handleGetShortUrl(req, res){
   try {
    const shortId = req.params.shortId
    if(!shortId) return res.json({"message": "Short id not found"});
    const entry = await urlModel.findOne({shortId})
    return res.redirect(entry.originalUrl)

   } catch (error) {
        return res.json({"message": error.message})
   }
}

export async function handleGetAllUrls(req, res){
    try {
        const urls = await urlModel.find({})
        return res.render('createdUrl', {urls, user: req.user})
    } catch (error) {
        console.log(error.message)
    }
}
