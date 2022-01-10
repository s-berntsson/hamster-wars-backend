const deleteOne = async (database, collection, id) => {
    docRef = database.collection(collection).doc(id)
    docSnapshot = await docRef.get()

    if(!docSnapshot.exists){
        return false
    }

    const result = docRef.delete()
    console.log(result)
    return true

}

module.exports = {deleteOne}