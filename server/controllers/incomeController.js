const Income = require('../models/Income');

// 🔹 Get all incomes (with optional filters: category, startDate, endDate)
exports.getIncomes = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const filter = { userId: req.user.id };

    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const incomes = await Income.find(filter).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔹 Add new income
exports.addIncome = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;
    const income = await Income.create({
      userId: req.user.id,
      title,
      amount,
      category,
      date: date ? new Date(date) : new Date(),
      description,
    });
    res.status(201).json(income);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔹 Update an income by ID
exports.updateIncome = async (req, res) => {
  try {
    const updated = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Income not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔹 Delete an income by ID
exports.deleteIncome = async (req, res) => {
  try {
    const deleted = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Income not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
