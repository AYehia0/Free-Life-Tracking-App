const mongoose = require("mongoose");

// each user has : 
// email[UNIQUE], name/fullname, password, age, activity lvl, 

const neutFacts = mongoose.Schema({
    protien: {
        type: Number,
        default: 0
    },
    fat: {
        type: Number,
        default: 0
    },
    carb: {
        type: Number,
        default: 0
    }
})
const foodItem = mongoose.Schema({
   name: {
       type: String,
       default: "",
       trim: true
   },
   facts: [neutFacts],
   cals: {
       type: Number,
       default: 0
   },
   codeId: {
       type: String,
       default: ""
   }

})
const foods = mongoose.Schema({
    breakfast: [foodItem],
    lunch: [foodItem],
    dinner: [foodItem],
    snacks: [foodItem],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Food", foods);