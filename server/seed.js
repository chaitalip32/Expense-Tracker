require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Expense = require('./models/Expense');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Expense.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await User.create({ name: 'Test User', email: 'test@me.com', passwordHash });

  await Expense.create([
    { userId: user._id, title: 'Lunch', amount: 200, category: 'Food', date: new Date(), description: 'Office lunch' },
    { userId: user._id, title: 'Taxi', amount: 150, category: 'Travel', date: new Date(), description: '' },
  ]);

  console.log('Seed done');
  process.exit();
}
seed();
