const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017'
const MongoClient = require('mongodb').MongoClient;
const {insertDocuments, getAllOrders} = require('../../dbFacades/mongoFacade') ;
const { setUserSessionWithPayload } = require('../../dbFacades/redisFacade');


//MONGODB CALL
async function getAllMongoOrders (){
const result = await getAllOrders();
return result;
}

async function insertSingleDocument (){
 const result = await insertDocuments(data);
 
}


//REDIS CALL
async function updateShoppingCart(data) {
    const result = await setUserSessionWithPayload(data.user.id, data);
    if (!result) throw Error('A DB error occured');
    return result;
}

module.exports = {
    insertSingleDocument,
    getAllMongoOrders,
    updateShoppingCart,
}

