const MongoClient = require('mongodb').MongoClient;
const connectionstring = "mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017";

////db = (new MongoClient("localhost:27017")).getDB("test");

MongoClient.connect(connectionstring, function(err, client) {
  if (err == null)
  {
    console.log("Database created!");
  }
  else
  {
    console.log("error: " + err);
  }
   const db = client.db("test");
   insertDocuments(db, (result) => console.log(result));
   
    client.close();
});

const insertDocuments = function(db, callback){
    const collection = db.collection("documents");

    collection.insertMany([
        {a : 4}, {a : 5}, {a : 6}
    ],
function(err, result){
    console.log(err)
    console.log(result.result.n);
    console.log(result.op.length);
    console.log("inserted 3 documents into collection");
    callback(result);
    });

}

