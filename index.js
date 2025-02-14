import "dotenv/config";
import express from "express"
import {dbConnect} from "./config.js"
import path from "path"
import cookieParser from "cookie-parser"
import staticRoute from "./routes/staticRoutes.js"
import route from "./routes/route.js"
import urlRoute from "./routes/urlRoute.js"
import { checkForAuthentication } from "./middleware/authentication.js"


const app = express()
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication("token"))

app.use("/", staticRoute)
app.use("/user", route)
app.use("/url",urlRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>console.log(`App running on port: ${PORT}`));

dbConnect(process.env.MONGO_URL)
.then(()=>console.log("MongoDb connected successfully"))
.catch((err)=>console.log(err))
