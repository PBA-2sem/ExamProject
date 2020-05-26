const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017';
const MongoClient = require('mongodb').MongoClient;




//const mongodb = MongoClient.connect(url);

// const insertDocuments = function (order) {

//     const db = MongoClient(url, { useUnifiedTopology: true });
//     const dbConnect = await db.connect();
//     const dbc = dbConnect.db("biglers_biler");
//     const collection = db.collection("orders");

//     collection.insert({order},function (err, result) {
//         console.log(err);
//         callback(result);
//     });

//     collection.update(
//         { _id: userId },
//         { $push: { orders: {order data} } }
//      )
// };

async function getAllOrders() {
    const res = [];
    const db = MongoClient(url, { useUnifiedTopology: true });
    const dbConnect = await db.connect();
    const dbc = dbConnect.db("biglers_biler");

    try {
        var cursor = await dbc.collection("orders").find();

        await cursor.forEach(function (doc, err) {
            res.push(doc);
        })
        return res;
    } catch (error) {
        console.log('ERROR: ', err)
        throw Error('An MongoDB error happened');
    }
}

module.exports = {

    insertDocuments,
    getAllOrders

}
