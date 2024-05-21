const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 9000;
const host = 'http://127.0.0.1:' + port;

// MongoDB connection URL
const mongodbUrl = 'mongodb://localhost:27017';

// Connect to MongoDB
async function connect() {
    const client = new MongoClient(mongodbUrl, { useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db('skies');
        const collection = db.collection('students');
        const result = await collection.find().toArray();
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

// Define routes
app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.get('/students', async (req, res) => {
    const result = await connect();
    res.send(result);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at ${host}`);
});
