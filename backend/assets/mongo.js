const connectionString = "mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017";
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(connectionString, function(err, client) {

  if (err == null)
    console.log("Connected successfully to server");
  else
    console.log("error: " + err)
 
  const db = client.db("test");

  insertDocuments(db, (result) => console.log(result));
 
  client.close();
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log(err)
    console.log(result.result.n);
    console.log(result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

