// user: dynamicShop
// pass:MP3NicGrHoIVGcqA

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efsdsdy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const categoriesCollection = client.db('dynamicShop').collection('categories');

        app.get('/packages', async (req, res) =>{
            const query = {};
            const cursor = categoriesCollection.find(query);
            const packages = await cursor.toArray();
            res.send(packages);
        });

        app.get('/packages/:id', async (req, res) =>{
            const id = req.params.id;
            const query = { package_id: id };
            const selectedPackages = await categoriesCollection.findOne(query);
            res.send(selectedPackages);
        });

    }
    finally{

    }
}

run().catch( () => console.log(error));



app.get('/', (req, res) => {
    res.send('Dynamic Shop API is running')
})
app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})