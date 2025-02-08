import { User } from "../models/user.js";

export async function handleUserSignUp(req, res){
    try {
        const {fullName, email, password} = req.body
        if(!fullName || !email || !password) return res.json({message: "All fields are required"}) ;
        
        await User.create({
            fullName, 
            email,
            password
        })

        res.redirect("/signin")
    } catch (error) {
        return res.status(500).json({"err": error})
    }
}

export async function handleUserLogin(req, res){
    try {
        const {email, password} = req.body
        if(!email || !password) return res.json({message: "All fields are required"}) ;

        const token = await User.matchPasswordAndGenerateToken(email, password)
        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render("login", {
            error: "Incorrect email or password",
        })
    }
}

export function handleUserLogOut(req, res){
    return res.clearCookie("token").redirect("/")
}
