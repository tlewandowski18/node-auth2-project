const db = require("../data/config")
const bcrypt = require("bcryptjs")

async function add(user) {
    user.password = await bcrypt.hash(user.password, 13)
    const [id] = await db("users").insert(user)
    return findById(id)
}

function find(){
    return db("users").select("id", "username", "department")
}

function findBy(filter) {
    return db("users")
        .where(filter)
}

function findById(id) {
    return db("users")
        .where({ id })
        .first()
        .select("id", "username", "department")
}

function findByDepartment(department) {
    return db("users")
        .where({ department })
        .select("id", "username", "department")
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByDepartment
}

