const express = require('express')
const hamstersRouter = express.Router()

// IMPORT CRUD FUNCTIONS (?)
const { getAll, getOne, getRandom } = require('../CRUD-functions/get.js');

//Connect to database
const { connect } = require('../database.js');
const db = connect();

const HAMSTERS = 'hamsters'

// GET RANDOM
hamstersRouter.get('/random', async (req, res) => {
    let hamster = await getRandom(db, HAMSTERS)
    // FELHANTERING !!!
    res.send(hamster)
})

//GET ONE
hamstersRouter.get('/:id', async (req, res) => {
    let hamster = await getOne(db, HAMSTERS, req.params.id)
    //FELHANTERING !!!!
    res.send(hamster)
})


// GET ALL
hamstersRouter.get('/', async (req, res) => {
    let hamsters = await getAll(db, HAMSTERS)
    //FELHANTERING !!!!!
    res.send(hamsters)
})




module.exports = {hamstersRouter}