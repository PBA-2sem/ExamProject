const url = 'mongodb://ec2-52-7-179-242.compute-1.amazonaws.com:27017,ec2-35-174-209-88.compute-1.amazonaws.com:27017';
const MongoClient = require('mongodb').MongoClient;




const mongodb = MongoClient.connect(url);

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

    const checkifexist = await collection.find({ userId: data.userId }).count() > 0;
    let updateRes;
    if (!checkifexist) {
        updateRes = await collection.insertOne({ ...data });
        return { success: 'created' }
    } else {
        updateRes = await collection.updateOne(
            { userId: data.userId },
            { $push: { orders: data.orders[0] } }
        )
        return { success: 'updated' }
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
