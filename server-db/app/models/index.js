const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.events = require("./event.model.js")(mongoose);

module.exports = db;