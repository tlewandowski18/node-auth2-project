const jwt = require("jsonwebtoken")

function restrict() {
    return async (req, res, next) => {
        const authErr = {
            message: "You shall not pass!"
        }
        try {
            console.log(req.cookies)
            const token = req.cookies.token
            if (!token) {
                return res.status(401).json(authErr)
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
                if (err) {
                    return res.status(401)
                }
                req.token = decodedPayload
                next()
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict