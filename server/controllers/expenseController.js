import Expense from '../models/Expense.js';

export const index = async (req, res) => {
    const expenses = await Expense.find({}).sort({ date: -1 });  // look through database for all expenses
    res.json(expenses);
}

export const createExpense = async (req, res) => {
    // receive expense form details
    const { description, amount, date } = req.body;

    // store details in database using schema
    const expense = new Expense({
        description,
        amount,
        date 
    });
    await expense.save();
    res.json({ message: "Success" }); // need to send this so alert can be activated
}

export const deleteExpense = async (req, res) => {
    await Expense.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Success" });
}

export const updateExpense = async (req, res) => {
    await Expense.updateOne({ _id: req.params.id }, {$set: req.body});
    res.json({ message: "Success" });
}