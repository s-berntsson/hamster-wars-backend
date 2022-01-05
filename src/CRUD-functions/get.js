// GET METHODS

// GET ALL
const getAll = async (database, collection) => {
    //Reference till datan
    const colRef = database.collection(collection)

    //Hämta snapshot av datan
    const colSnapshot = await colRef.get()

    let array = [];

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
    const docSnapshot = await docRef.get()

    if (!docSnapshot.exists) {    //Kontrollera att datan finns
        return {}
    }

    const data = await docSnapshot.data()

    return data
}

//GET RANDOM
const getRandom = async (database, collection) => {
    //Hämta alla
    const documents = await getAll(database, collection)

    //Skapa random index
    const index = Math.floor( Math.random() * documents.length )

    //Hämta dokument baserat på index
    const data = documents[index]
    
    return data
}

module.exports = { getAll, getOne, getRandom }