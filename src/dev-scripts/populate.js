//Connecta till databasen eftersom detta skript körs separat från servern
const {connect} = require('../database.js')
const db = connect();

//Collection-namn
const HAMSTERS = 'hamsters'

//Hämta jsondata
const data = require('../../secrets/data.json');

//Kör funktionen
populate(HAMSTERS);

async function populate(col) {

    data.forEach(async (obj) => {
        
        const docRef = await db.collection(col).add(obj)  //await krävs bara om du vill göra ngt med ex. ID innan nästa loop
        console.log('Added document with ID: ', docRef.id);

    })

}