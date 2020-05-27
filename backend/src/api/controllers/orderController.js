const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017'
const MongoClient = require('mongodb').MongoClient;
const {insertDocuments, getAllOrders} = require('../../dbFacades/mongoFacade') ;


async function getAllMongoOrders (){
const result = await getAllOrders();
return result;
}

async function insertSingleDocument (){
 const result = await insertDocuments(data);
 
}

module.exports = {
    insertSingleDocument,
    getAllMongoOrders
}

