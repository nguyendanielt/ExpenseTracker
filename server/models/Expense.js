import mongoose from 'mongoose';
const { Schema } = mongoose;

const expenseSchema = new Schema({
    description: String,
    amount: Number,
    date: { type: Date, default: new Date() },
    createdAt: { type: Date, default: Date.now }
});

export default new mongoose.model('Expense', expenseSchema);