// import express/create app
const express = require('express')
const app = express()

const { hamstersRouter } = require('./routes/hamsters')

// PORT
const PORT = process.env.PORT || 8000

// middleware
app.use((req, res, next) => {
    //logger
    console.log(req.method, req.url)
    next()
})

// routes/endpoints
app.use('/hamsters', hamstersRouter)

//starta server
app.listen(PORT, () => {
    console.log('Server listening on port ', PORT)
})