const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      await client.connect();
      const db = client.db('SylrinaDB');
      const collection = db.collection('products');
      const result = await collection.insertOne(req.body);
      res.status(200).json({ success: true, id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: "خطأ في الاتصال بالقاعدة" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
