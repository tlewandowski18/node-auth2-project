const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const { username } = req.body
        const user = await Users.findBy({username}).first()
        if (user) {
            res.status(409).json({
                message: "Username already exists"
            })
        }

        res.status(201).json(await Users.add(req.body))
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({username}).first()
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user || !passwordValid) {
            res.status(401).json({
                message: "You shall not pass!"
            })
        }
        const tokenPayload = {
            userId: user.id,
            userDepartment: user.department
        }
        res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))
        res.json({
            message: `Welcome ${user.username}!`
        })
    } catch(err) {
        next(err)
    }
})

router.get("/users", restrict(), async (req, res, next) => {
    try {
        const department = req.token.userDepartment
        console.log(department)
        if (!department) {
            res.status(401).json({
                message: "You must be assigned to department to see users"
            })
        } else if (department === "admin") {
            const users = await Users.find()
            res.json(users)
        } else {
            const users = await Users.findByDepartment(department)
            res.json(users)
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router