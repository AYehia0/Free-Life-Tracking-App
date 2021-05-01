const mongoose = require("mongoose");

// Things related to the body : activity lvl, height, weight, age
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    body: {
        type: String,
        required: true,
        default: ""
    },
    // Ref to that user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Blog", blogSchema);