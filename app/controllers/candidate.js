const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Candidate = require('../models/Candidate');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();

        return res.send({candidates});
    } catch (err) {
        return res.status(400).send({error:'Error loading candidates'});
    }
    res.send({user: req.userId}); 
});

router.get('/:candidateId', async (req, res) => {
    res.send({user: req.userId}); 
});

router.post('/', async (req, res) => {
    try {
        const candidate = await Candidate.create({...req.body, user: req.userId});
        

        return res.send({candidate});
    } catch (err) {
        return res.status(400).send({error:'Error creating new candidate'})
    }
 
});

router.put('/:candidateId', async (req, res) => {
    res.send({user: req.userId}); 
});

// router.delete('/:candidateId', async (req, res) => {
//     res.send({user: req.userId}); 
// });

module.exports = app => app.use('/candidates', router)