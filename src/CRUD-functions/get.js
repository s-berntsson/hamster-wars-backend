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

module.exports = { getAll, getOne, getRandom }