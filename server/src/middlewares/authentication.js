const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.json({message:"Authorization failed, Please Login"});
    }
    else {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JSON_KEY, function(err, decoded) {
            if(err) {
                res.json({message:"Please Login"})
            }
            else {
                req.body.userId = decoded.userId;
                next();
            }
        })
    }
}

module.exports = {authentication};