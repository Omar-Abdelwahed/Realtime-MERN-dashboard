const jwt = require('jsonwebtoken');

authmiddleware = async (req, res, next) => {
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            const token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, "mySuperSecretKey123!@#")
            if (decoded.userId && decoded.email) { //If decoded userID s7I7 w email s7i7 (if they're faulsy values "0/null/notnumber/false/undefined or string ferga)
                    req.userId = decoded.userId    // 
                    next() //yet3adda lel getOne
            }
            else {
                res.status(401).send({ message: 'Authentication failed' })
            }
        }
        else {
            res.status(401).send({ message: 'Authentication failed' })
        }
    } catch (error) {
        res.status(401).send({ message: 'Invalid token' });
    }
}

module.exports = authmiddleware;