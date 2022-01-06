const put = async (database, collection, id, updates) => {
    let result = isCorrectObject(updates)

    if(!result.success){
        return result
    }

    const settings = { merge: true }

    await database.collection(collection).doc(id).set(updates, settings)
    return result
}

const isCorrectObject = (body) => {

    let result = {
        code: 400,
        message: '',
        success: false
    }

    //Kontrollera att body är ett objekt
    if(typeof(body) !== 'object'){
        result.message = 'Body must be an object.'
        return result

    }
    
    //Kontrollera ifall det finns otillåtna keys
    const allowedKeys = ['name' , 'age' , 'favFood' , 'loves' , 'imgName' , 'wins' , 'defeats' , 'games']
    const objectKeys = Object.keys(body)
    const badKeys = objectKeys.filter(key => !allowedKeys.includes(key) ) 
    // OBS! Det går fof att skicka flera keys med samma namn :( 

    if(badKeys.length > 0){
        result.message = `Object must only include allowed keys. Bad keys: ${badKeys}`
        return result

    } else {
        result = {
            code: 200,
            message:'OK',
            success: true
        }
        return result
    }
}

module.exports = {put}