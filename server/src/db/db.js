const mongoose = require("mongoose");
require("dotenv").config();

const conenction = mongoose.connect(process.env.MONOGDB_URL);

module.exports = {conenction};