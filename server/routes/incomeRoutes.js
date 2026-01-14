const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addIncome ,getIncomes,updateIncome,deleteIncome} = require('../controllers/incomeController');

router.post('/', auth, addIncome);
router.get('/', auth, getIncomes);
router.put('/:id', auth, updateIncome);
router.delete('/:id', auth, deleteIncome);

module.exports = router;
