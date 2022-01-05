const {connect} = require('../database.js')
const db = connect();

const HAMSTERS = 'hamsters'


clear(HAMSTERS);

async function clear(col){
    console.log(`Clearing all ${col}...`)

     //Hämta reference till datan
     const colRef = db.collection(col)
    
     //Hämta snapshot av datan
     const colSnapshot = await colRef.get()
 
     //Kontrollera att det finns något att ta bort
     if ( colSnapshot.empty ) {
         console.log(`No ${col} to delete.`)
         return
     }

     let deleted = 0

    //Ta bort varje object
    colSnapshot.forEach(doc => {
        colRef.doc(doc.id).delete()
        deleted++
     })
 
     console.log(`Successfully deleted ${deleted} ${col}`)
}