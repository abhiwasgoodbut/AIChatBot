import mongoose, { mongo } from 'mongoose'

const transactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User",ref: 'User', require: true},
    planId: {type: String,  require: true},
    credits: {type: Number,  require: true},
    amount: {type: Number,  require: true},
    isPaid: {type: Boolean,  default: false},
},{timestamps: true})

const Transaction = mongoose.model('Transaction',transactionSchema);

export default Transaction;