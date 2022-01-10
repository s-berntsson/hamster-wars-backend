const { getCutest } = require('../CRUD-functions/get.js');
const {connect} = require('../database.js')
const db = connect();

const HAMSTERS = 'hamsters'

getCutest(db, HAMSTERS)

/* let array = [1, 2, 3, 4]

let array2 = []

for(let i = 0; i<3; i++){
    array2.push(array[i])
}

console.log(array2) */