const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Vote = require('../models/Vote');
const User = require('../models/user');

const router = express.Router();

router.use(authMiddleware);

let BlockChain = require("../middlewares/blockChain");
let blockChain = new BlockChain();

router.get('/', async (req, res) => {
    try {
        const votes = await Vote.find();

        return res.send({votes});
    } catch (err) {
        return res.status(400).send({error:'Error loading votes'});
    }
    res.send({user: req.userId}); 
});

router.get('/validate/:voteId', async (req, res) => {
    res.send({user: req.userId}); 
});

router.post('/', async (req, res) => {
    try {
        userv = await User.findOne({'_id': req.userId});
        if(userv.voted){
            return res.send({error:"User already voted"});
        }
        else{
            
            blockChain.addNewTransaction(req.userId, req.body.candidate, 1);
            let prevHash = blockChain.lastBlock() ?
                blockChain
                .lastBlock()
                .hash :
                null;
            const vote = blockChain.addNewBlock(prevHash);
            const votedNow = new Date();
            
            await User.findByIdAndUpdate(req.userId, {
                '$set': {
                    voted: true,
                    votedAt: votedNow
                }
                }, { new: true, useFindAndModify: false }
            );

            return res.send({prevHash: vote.prevHash, hash: vote.hash, transaction: vote.transactions, votedAt: votedNow});
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({error:'Error creating new vote'})
    }
 
});

// router.put('/:voteId', async (req, res) => {
//     res.send({user: req.userId}); 
// });

// router.delete('/:voteId', async (req, res) => {
//     res.send({user: req.userId}); 
// });

module.exports = app => app.use('/votes', router)