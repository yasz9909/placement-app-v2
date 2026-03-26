const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb://yaswanth2420_db_user:IMqMv4mUdBI9bX9V@ac-4p2u7bw-shard-00-00.sodujdy.mongodb.net:27017,ac-4p2u7bw-shard-00-01.sodujdy.mongodb.net:27017,ac-4p2u7bw-shard-00-02.sodujdy.mongodb.net:27017/?ssl=true&replicaSet=atlas-zgqcz1-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected successfully to MongoDB Atlas!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
