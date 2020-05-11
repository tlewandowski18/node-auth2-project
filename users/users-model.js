const db = require("../data/config")
const bcrypt = require("bcryptjs")

async function add(user) {
    user.password = await bcrypt.hash(user.password, 13)
    const [id] = await db("users").insert(user)
    return findById(id)
}

function find(){
    return db("users")
}

function findBy(filter) {
    return db("users")
        .where(filter)
}

function findById(id) {
    return db("users")
        .where({ id })
        .first()
}

module.exports = {
    add,
    find,
    findBy,
    findById
}

