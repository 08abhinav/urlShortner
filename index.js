import express from "express"
import {PORT, dbConnect} from "./config.js"
import path from "path"
import cookieParser from "cookie-parser"
import staticRoute from "./routes/staticRoutes.js"
import route from "./routes/route.js"
import urlRoute from "./routes/urlRoute.js"
// import urlGet from "./routes/urlGet.js"
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

app.listen(PORT, ()=>console.log(`App running on port: ${PORT}`));

dbConnect("mongodb://127.0.0.1:27017/shortner")
.then(()=>console.log("MongoDb connected successfully"))
.catch((err)=>console.log(err))
