const express = require('express')
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://ToDo:zFT3xNUDWt0XINJs@cluster0.0yuzq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
        await client.connect()
        const databaseCollection = client.db("todo-job-task").collection("todo");


        app.post('/todo', async (req, res) => {
            const booking = req.body
            const result = await databaseCollection.insertOne(booking)
            return res.send(result)
        })

        app.get('/todo', async (req, res) => {
            const query = {}
            const cursor = databaseCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await databaseCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Todo portal server is running !')
})

app.listen(port, () => {
    console.log(`Todo portal port is running ${port}`)
})