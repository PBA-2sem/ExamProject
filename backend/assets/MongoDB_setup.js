const MongoClient = require('mongodb').MongoClient;
const connectionstring = "mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017";


MongoClient.connect(connectionstring, function(err, client) {

  if (err == null)
    console.log("Connected successfully to server");
  else
    console.log("error: " + err);

   const db = client.db("biglers_biler");

   //insertDocuments(db, (result) => console.log(result));
   insertDocuments(db, (result) => console.log(result));
   
   client.close();
});

const insertDocuments = function(db, callback){
  const collection = db.collection("orders");
  
  collection.insert([
      {"user_id" : 1, "date": new Date(), "products": {
        "productid" : 1,
        "mode" : 'fortwo',
        "make" : 'Cavalier',
        "color" : 'Puce',
        "price" : 32
      }}
    ],function(err, result)
    {
      console.log(err);
      callback(result);
    });  
}



