const mysql = require("mysql")

const db = mysql.createConnection({
    host: "sql7.freemysqlhosting.net",
    user: "sql7356176",
    password: "TavxrusMet"
})


module.exports = db