const url = 'mongodb://ec2-52-7-179-242.compute-1.amazonaws.com:27017,ec2-35-174-209-88.compute-1.amazonaws.com:27017';

const MongoClient = require('mongodb').MongoClient;


// const data = {
//     _id: "c9444ac7-9d19-11ea-9249-f201836c1c4e",
//     orders: [
//         {
//             date: "A DATE",
//             cars: [
//                 {
//                     "productid": 4,
//                     "mode": 'fortwo',
//                     "make": 'Cavalier',
//                     "color": 'Puce',
//                     "price": 32
//                 },
//                 {
//                     "productid": 2,
//                     "mode": 'forasdsatwo',
//                     "make": 'Cavaasdsalier',
//                     "color": 'Puasdasce',
//                     "price": 133
//                 }
//             ]
//         }

//     ]
// }
findOrdersOfDate("2020-05-29");

async function findOrdersOfDate(date)
{
    const db = MongoClient(url, { useUnifiedTopology: true });
    const dbConnect = await db.connect();
    const dbc = await dbConnect.db("biglers_biler");
    const collection = await dbc.collection("orders");
    const dailyTotal = await collection.mapReduce(
        function(){
            const userId = this.userId;
            this.orders.forEach(function(order){ if(order.date.split("T")[0] === scopedate){
                emit(userId, order)

            }})

        },
        function(key, orders) {
           
            let totalprice = 0;
            orders.forEach( order => {order.products.forEach( product => {totalprice += product.price*product.amount})}) 
            return totalprice;
        },
        {
            query : {_id:{$exists:true}},
            out : "user_total_sale",
            scope : {scopedate:date}
        }
     )
 
    const finalsomething = await dbc.collection("user_total_sale").aggregate([ {$group: {
        _id: null,
        "Total": {$sum: "$value"}
        }}
    ]).next()

    console.log(finalsomething);
     return finalsomething;
    
}


async function insertDocuments(data) {
    const db = MongoClient(url, { useUnifiedTopology: true });
    const dbConnect = await db.connect();

    //Transaction: Start a Client Session
    const session = dbConnect.startSession();
    let result;
    try {
        result = await session.withTransaction(async () => {

            const dbc = await dbConnect.db("biglers_biler");
            const collection = await dbc.collection("orders");

            const storedUser = await collection.findOne({ userId: data.userId });
            let updateRes;
            if (!storedUser) {
                updateRes = await collection.insertOne({ ...data }, { session });
                return { success: 'created' }
            } else {
                updateRes = await collection.updateOne(
                    { _id: storedUser._id },
                    { $push: { orders: data.orders[0] } },
                    { session }
                )
                return { success: 'updated' }
            }
        },
        {
              
                readPreference: 'primary',
                readConcern: { level: 'majority' },
                writeConcern: { w: 'majority' },
               
        }
        )
        
    } catch (e) {
        console.log(e);
        throw Error('An error occured storing shoppingcart');
    } finally {
        await session.endSession();
        await db.close();
    };
    return result;
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
