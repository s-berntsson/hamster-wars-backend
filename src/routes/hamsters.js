const express = require('express')
const hamstersRouter = express.Router()

// IMPORT CRUD FUNCTIONS (?)
const { getAll } = require('../scripts/get.js');

//Connect to database
const { connect } = require('../database.js');
const db = connect();

const HAMSTERS = 'hamsters'

// GET ALL
hamstersRouter.get('/', async (req, res) => {
    let hamsters = await getAll(db, HAMSTERS)
    res.send(hamsters)
})




module.exports = {hamstersRouter}