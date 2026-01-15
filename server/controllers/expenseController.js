const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const filter = { userId: req.user.id };
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    // ✅ VALIDATION HERE
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0"
      });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      title,
      amount: Number(amount),
      category,
      date: date ? new Date(date) : new Date(),
      description
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    if (req.body.amount !== undefined && Number(req.body.amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0"
      });
    }

    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        ...req.body,
        amount: req.body.amount ? Number(req.body.amount) : req.body.amount
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
