const post = async (database, collection, newObject) => {

    let result = isCorrectObject(newObject)

    if(result.success){
        const docRef = await database.collection(collection).add(newObject)
        result = {
            ...result,
            id: docRef.id
        }
    }

    return result
    
}

const isCorrectObject = (body) => {

    let result = {
        code: 400,
        message: '',
        success: false
    }

    if(typeof(body) !== 'object'){
        result.message = 'Body must be an object.'
        console.log(result.message)
        return result
    } else if(Object.keys(body).includes("id")){
        result.message = 'Cannot include id.'
        console.log(result.message)
        return result

    } else if( !(Object.keys(body).includes('name' && 'age' && 'favFood' && 'loves' && 'imgName' && 'wins' && 'defeats' && 'games')) ){
        result.message = 'Must include correct keys.'
        console.log(result.message)
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

module.exports = { post }