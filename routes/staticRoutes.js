import express from "express"
const staticRoute = express.Router()

staticRoute.get("/", (req, res)=>{
    res.render("home", {
        user: req.user
    })
})

staticRoute.get("/signin", (req, res)=>{
    res.render('login')
})

staticRoute.get("/signup", (req, res)=>{
    res.render('signup')
})

export default staticRoute;