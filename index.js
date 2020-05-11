const express = require("express")
const cookieParser = require("cookie-parser")
const usersRouter = require("./users/users-router")

const server = express()
const port = process.env.PORT || 6000

server.use(express.json())
server.use(cookieParser())
server.use("/api", usersRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
