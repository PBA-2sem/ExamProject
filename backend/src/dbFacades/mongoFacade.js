const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017';
const MongoClient = require('mongodb').MongoClient;




const mongodb = MongoClient.connect(url);

insertDocuments();

async function insertDocuments(data) {

    // const data = {      
    //         _id: "c9444ac7-9d19-11ea-9249-f201836c1c4e",
    //             orders: [
    //                 {
    //                     date: "A DATE",
    //                     cars: [
    //                         {
    //                             "productid": 4,
    //                             "mode": 'fortwo',
    //                             "make": 'Cavalier',
    //                             "color": 'Puce',
    //                             "price": 32
    //                         },
    //                         {
    //                             "productid": 2,
    //                             "mode": 'forasdsatwo',
    //                             "make": 'Cavaasdsalier',
    //                             "color": 'Puasdasce',
    //                             "price": 133
    //                         }
    //                     ]
    //                 }

    //             ]
    //     }

    const db = MongoClient(url, { useUnifiedTopology: true });
    const dbConnect = await db.connect();
    const dbc = await dbConnect.db("biglers_biler");
    const collection = await dbc.collection("orders");

    const checkifexist = await collection.find({ _id: data._id }).count() > 0;

    if (checkifexist == false) {

        await collection.insertOne({ _id: data._id, ...data });
    }
    else {

        await collection.updateOne(
            { _id: data._id }, { $push: { orders: data.orders[0] } }
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
