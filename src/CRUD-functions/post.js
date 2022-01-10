const post = async (database, collection, newObject) => {

    let result = isCorrectObject(newObject)

    if (result.success) {
        const docRef = await database.collection(collection).add(newObject)
        result = {
            ...result,
            id: docRef.id
        }
    }

    return result

}

const isCorrectObject = (body) => {

    // Resultatobjekt att uppdatera vid olika fall 
    let result = {
        code: 400,
        message: '',
        success: false
    }

    // KONTROLLERA OM TYP OBJEKT ---
    if (typeof (body) !== 'object') {
        result.message = 'Body must be an object.'
        return result
    }

    // KONTROLLERA KEYS ---
    const allowedKeys = ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games']
    const objectKeys = Object.keys(body)

    // otillåtna keys
    const badKeys = objectKeys.filter(key => !allowedKeys.includes(key))
        // OBS! Det går fof att skicka flera keys med samma namn :( 

    if (badKeys.length > 0) {
        result.message = `Object must only include allowed keys. Bad keys: ${badKeys}`
        return result
    }

    // obligatoriska keys saknas
    const missingKeys = allowedKeys.filter(key => !objectKeys.includes(key))

    if (missingKeys.length > 0) {
        result.message = `Missing obligatory keys: ${missingKeys}`
        return result
    }

    // REQ OK! ---
    result = {
        code: 200,
        message: 'OK',
        success: true
    }
    return result
}

module.exports = { post }