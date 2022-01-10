// GET METHODS

// GET ALL
const getAll = async (database, collection) => {
    //Reference till datan
    const colRef = database.collection(collection)

    //Hämta snapshot av datan
    const colSnapshot = await colRef.get()

    let array = [];

    //Spara data i array
    await colSnapshot.forEach(docSnapshot => {
        const data = docSnapshot.data()
        data.id = docSnapshot.id
        array.push(data)
    })

    return array
}

//GET ONE (based on ID)
const getOne = async (database, collection, id) => {
    const docRef = database.collection(collection).doc(id)
    const docSnapshot = await docRef.get()  //Bad request returnerar undefined, som hanteras i routern
    const data = await docSnapshot.data()
    return data
}

//GET RANDOM
const getRandom = async (database, collection) => {
    const documents = await getAll(database, collection)
    const index = Math.floor( Math.random() * documents.length )
    const data = documents[index]

    return data
}

//GET CUTEST
const getCutest = async (database, collection) =>{
    //getAll
    const colSnapshot = await getAll(database, collection)

    let cuteScores = [];

    //Calculate score for each ham, save in array along with id
    colSnapshot.forEach(docSnapshot => {
        const cuteScore = docSnapshot.wins - docSnapshot.defeats
        cuteScores.push({id: docSnapshot.id, score: cuteScore})
    })

    //Sort cutescores descending
    cuteScores.sort((a, b) => b.score - a.score)

    let winners = []
    const nrOfWinners = 5

    //Get as many winners as declared in nrOfWinners by getting x first in array
    for(let i = 0; i<nrOfWinners; i++){
        const winnerId = cuteScores[i].id
        const winner = colSnapshot.find(obj => obj.id === winnerId) 
        winners.push(winner)
    }

    return winners
}

module.exports = { getAll, getOne, getRandom, getCutest }