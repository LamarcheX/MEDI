const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'GestionDeCitas';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  const insertResult = await collection.insertMany([
    { a: 1, Nombre: "MarcoantonioSoli" },
    { a: 2, Nombre: "Pepo" },
    { a: 3, Nombre: "Juana" }
  ]);

  // console.log('Inserted documents =>', insertResult);

  const deleteResult = await collection.deleteMany({ a: 1 },{ a: 2 },{ a: 3 });
  console.log('Deleted documents =>', deleteResult);

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());