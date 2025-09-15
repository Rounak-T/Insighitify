const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  income: { type: Number, required: true },
  expense: { type: Number, required: true , default: 0},
  savingsgoal: { type: Number, required: true },
  monthlyStats: [{
    month: { type: String , required: true },
    income: { type: Number , default: 0 },
    expense: { type: Number , default: 0 },
    savings: { type: Number , default: 0 },
  }]
});

module.exports = mongoose.model("User", userSchema);
