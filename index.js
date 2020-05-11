const express = require("express")

const server = express()
const port = process.env.PORT || 6000

server.use(express.json())

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
