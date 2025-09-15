const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/user");

exports.register = async (req, res) => {
try {
    const { name, email, password, income, savingsgoal } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert income and savingsgoal to numbers
    const incomeNum = Number(income);
    const savingsgoalNum = Number(savingsgoal);
    const expenseNum = 0; // initial expense

    // Create monthlyStats for the current month
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    const monthlyStats = [
      { month: currentMonth, income: incomeNum, expense: expenseNum, savings: incomeNum - expenseNum }
    ];

    // Save new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      income: incomeNum,
      savingsgoal: savingsgoalNum,
      expense: expenseNum,
      monthlyStats
    });

    await user.save();

    res.json({ message: "User registered successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, expense, income } = req.body;
    const currentMonth = new Date().toISOString().slice(0, 7);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // EXPENSE UPDATE
    if (expense !== undefined) {
      const numExpense = Number(expense);
      user.expense += numExpense;

      const monthStat = user.monthlyStats.find(stat => stat.month === currentMonth);
      if (monthStat) {
        monthStat.expense += numExpense;
        monthStat.savings = monthStat.income - monthStat.expense;
      } else {
        user.monthlyStats.push({
          month: currentMonth,
          income: user.income, // use existing income
          expense: numExpense,
          savings: user.income - numExpense,
        });
      }
    }

    // INCOME UPDATE
    if (income !== undefined) {
      user.income = Number(income);

      const monthStat = user.monthlyStats.find(stat => stat.month === currentMonth);
      if (monthStat) {
        monthStat.income = Number(income);
        monthStat.savings = monthStat.income - monthStat.expense;
      } else {
        user.monthlyStats.push({
          month: currentMonth,
          income: user.income,
          expense: 0, // if no expenses yet
          savings: user.income,
        });
      }
    }

    // Save updated user
    await user.save();
    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User found:", user); // Check if user exists
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match?", isMatch); // Should be true
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token, name: user.name, email: user.email, income: user.income, savingsgoal: user.savingsgoal, expense: user.expense, monthlyStats: user.monthlyStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// You get new token every time you login , which is maintained through the currently loggedin session.

exports.resetpassword = async (req, res) => {
  try {
    const { email, newPass } = req.body;
    const newhashedPassword = await bcrypt.hash(newPass, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: newhashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
