const Subscription = require("../Model/subscription");

exports.createSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user.id, 
    });
    res.status(201).json(subscription);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });
    res.json(subscriptions);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found or unauthorized" });
    }
    res.json({ message: "Subscription deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.subscriptionStats = async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user.id });

    let total_monthlySubs_cost = 0;
    let total_yearlySubs_cost = 0;
    let recent_dues = [];
    const today = new Date();

    subs.forEach(item => {
      if (item.billingCycle === "monthly") {
        total_monthlySubs_cost += item.cost;
      } else if (item.billingCycle === "yearly") {
        total_yearlySubs_cost += item.cost;
      }
      let nextDue = new Date(item.startDate);
      while (nextDue <= today) {
        if (item.billingCycle === "monthly") {
          nextDue.setMonth(nextDue.getMonth() + 1);
        } else if (item.billingCycle === "yearly") {
          nextDue.setFullYear(nextDue.getFullYear() + 1);
        }
      }
      const daysLeft = Math.ceil((nextDue - today) / (1000 * 60 * 60 * 24));

      if (daysLeft > 0 && daysLeft <= 7) {
        recent_dues.push({
          name: item.name,
          cost: item.cost,
          billingCycle: item.billingCycle,
          dueDate: nextDue.toISOString().split("T")[0],
          daysLeft
        });
      }
    });
    return res.json({
      total_monthlySubs_cost,
      total_yearlySubs_cost,
      recent_dues
    });

  } catch (err) {
    console.error("Error in subscriptionStats:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

