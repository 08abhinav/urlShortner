import { validateToken } from "../services/authorization.js";

export function checkForAuthentication(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        // console.log(tokenCookieValue)

        if (!tokenCookieValue) {
            // console.log("No token found, moving to next middleware");
            return next();
        }
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            // console.log("Invalid token:", error.message);
        }

        return next();
    };
}

// export function restricTo(role){
//     return function(req, res, next){
//         if(!req.user) return res.redirect('/signin')
        
//         if(!role.includes(req.user.role)) return res.end("UnAuthorized")

//         return next()
//     }    
// }
