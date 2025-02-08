import express from 'express'
import {handleUserLogOut, handleUserLogin, handleUserSignUp} from "../controllers/user.js"

const route = express.Router()

route.post("/signup", handleUserSignUp)
route.post("/login", handleUserLogin)
route.get("/logout", handleUserLogOut)

export default route;
