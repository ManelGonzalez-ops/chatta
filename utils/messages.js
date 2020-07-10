const moment = require("moment")

const formatMessage = (user, text) => (
    {
        user,
        text,
        time: moment().format("hh:mm a")
    }
)

module.exports = formatMessage