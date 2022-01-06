// Import Router and create router object
const { Router } = require('express')
const hamstersRouter = Router()

//Connect to database
const { connect } = require('../database.js');
const db = connect();
const HAMSTERS = 'hamsters' //Collection name

// Import CRUD functions
const { getAll, getOne, getRandom } = require('../CRUD-functions/get.js');
const { post } = require('../CRUD-functions/post.js');
const { put } = require('../CRUD-functions/put.js');


// GET RANDOM
hamstersRouter.get('/random', async (req, res) => {
    let hamster = await getRandom(db, HAMSTERS)
    // FELHANTERING !!!
    res.send(hamster)
})

//GET ONE
hamstersRouter.get('/:id', async (req, res) => {
    let response = await getOne(db, HAMSTERS, req.params.id)
    if(!response){   //Bad request returnerar undefined som hanteras här
        res.sendStatus(404)
    }
    res.send(response)
})

// GET ALL
hamstersRouter.get('/', async (req, res) => {
    let hamsters = await getAll(db, HAMSTERS)
    //FELHANTERING !!!!!
    res.send(hamsters)
})

// POST
hamstersRouter.post('/', async (req, res) => {
    let result = await post(db, HAMSTERS, req.body)

    if(!result.success){
        res.status(result.code).send(result.message)
    }

    const idObj = { id: result.id }

    res.send(idObj)
})

//PUT
hamstersRouter.put('/:id', async (req, res) => {
    const result = await put(db, HAMSTERS, req.params.id, req.body)
    res.status(result.code).send(result.message)
})


module.exports = { hamstersRouter }