const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017'
const MongoClient = require('mongodb').MongoClient;
const { insertDocuments, getAllOrders } = require('../../dbFacades/mongoFacade');
const { setUserSessionWithPayload } = require('../../dbFacades/redisFacade');
const { registerCountryAndColor } = require('../../dbFacades/neo4jFacade');

//MONGODB CALL
async function getAllMongoOrders() {
    const result = await getAllOrders();
    return result;
}

async function insertSingleDocument(data) {
    const country = data.userCountry;
    delete data.userCountry;

    // ADD order to neo4j graph for recommendation
    data.orders[0].products.forEach(item => {
        for (let i = 0; i < item.amount; i++) {
            registerCountryAndColor(country, item.color);
        }
    })

    try {
        const result = await insertDocuments(data);
        return result;
    } catch (err) {
        throw Error(err);
    }
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

