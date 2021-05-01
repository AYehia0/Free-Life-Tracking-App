const mongoose = require("mongoose");

// Things related to the body : activity lvl, height, weight, age
const bodyThings = mongoose.Schema({
    age: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    activity: {
        type: Number,
        default: 0
    },
    // Ref to that user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Bodythings", bodyThings);