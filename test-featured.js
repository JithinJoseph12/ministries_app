const { MongoClient } = require('mongodb');

async function check() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ministries_app"; // guess DB URL, let's just connect if possible
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const events = await db.collection('events').find({}).toArray();
    console.log("Total events:", events.length);
    console.log("Featured events:", events.filter(e => e.featured).length);
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
check();
