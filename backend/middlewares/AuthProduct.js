
const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req, res, next) => {

    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ message: "Unauthorized, Please LogIn" })
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded; // by saving this in req.user we save database fetch for same user, now we can use user anywhere
        next();
    } catch (err) {
        return res.status(403).json({ message: "Unauthorized, LogIn expired" })
    }
}

function ensureAuthorized(roles){
    return (req, res, next) => {
        const { role } = req.user;
        if (!roles.includes(role)) {
            return res.status(403).json({ message: "Access Forbidden" }); 
        }
        next();
    };
}

// module.exports = ensureAuthenticated;

module.exports = {
    ensureAuthenticated,
    ensureAuthorized
}