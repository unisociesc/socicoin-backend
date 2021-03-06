const mongoose = require('../../database');
let Schema = mongoose.Schema;

//Create the BlockChain Schema
const BlockChainSchema = new Schema({
    index: {
        required: true,
        type: Schema.Types.Number
    },
    timestamp: {
        required: true,
        type: Schema.Types.Date,
        default: Date.now()
    },
    transactions: {
        required: true,
        type: Schema.Types.Array
    },
    prevHash: {
        required: false,
        type: Schema.Types.String
    },
    hash: {
        required: true,
        type: Schema.Types.String
    }
});

const BlockChain = mongoose.model("BlockChain", BlockChainSchema);

module.exports = BlockChain;