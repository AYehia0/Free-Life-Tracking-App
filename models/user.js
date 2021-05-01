const mongoose = require("mongoose");

// each user has : 
// email[UNIQUE], name/fullname, password, age, activity lvl, 
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    date: Date.now,

    bodythings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Bodythings"
        }
    ],
    food: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }
    ],
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    } 
})

module.exports = mongoose.model("User", userSchema);