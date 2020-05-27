const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017';
const MongoClient = require('mongodb').MongoClient;




const mongodb = MongoClient.connect(url);

async function insertDocuments(data) {

    const db = MongoClient(url, { useUnifiedTopology: true });
    const dbConnect = await db.connect();
    const dbc = dbConnect.db("biglers_biler").collection("orders");
    const collection = db.collection("orders");

    const checkifexist = await db.documentExistsOrNotDemo.find({ "userid": data }).count() > 0;
    if (checkifexist = false) {
        await collection.insert({ data }, function (err, result) {
            console.log(err);
            callback(result);
        });
    }
    else {
        await collection.update(
            { _id: userId },
            { $push: { orders: { order: data } } }
        )
    }

};

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
