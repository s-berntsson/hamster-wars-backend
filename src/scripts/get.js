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

module.exports = { getAll }