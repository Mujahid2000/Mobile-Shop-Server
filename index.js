const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5050;

//middleware
app.use(cors());
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mujahid.frqpuda.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    

    const DataCollection = client.db("Mobile-Shop").collection('MobileData');
    const cartCollection = client.db("Mobile-Shop").collection('Cart');

    app.get('/mobileData', async (req, res) =>{
        const result = await DataCollection.find().toArray();
        res.send(result);
    })

    app.post('/cartData', async (req, res) =>{
      const user = req.body;
      console.log(user);
      const result = await cartCollection.insertOne(user);
      res.send(result);
  })

  app.get('/cartData', async (req, res) =>{
    const result = await cartCollection.find().toArray();
    res.send(result);
})

app.delete('/cartData/:id', async(req, res) =>{
  const id = req.params.id;
  const filter = {_id : id}
  const result = await cartCollection.deleteOne(filter)
  res.send(result)
})

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) =>{
    res.send('mobile sell server is running')
})

app.listen(port, () => {
    console.log(`Mobile server is sitting on the port ${port}`);
})