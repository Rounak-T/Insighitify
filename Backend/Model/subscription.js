const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  billingCycle: { type: String, enum: ['monthly', 'yearly'], required: true },
  startDate: { type: Date, required: true },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
