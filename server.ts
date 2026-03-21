import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

const url = 'mongodb+srv://arnabacharya1612_db_use:test123@vinternship-sandbox.8peoruq.mongodb.net/'
const client = new MongoClient(url)

let db:any;

client.connect()
  .then(() => {
    db = client.db('vinotes')
    console.log('connected to mongodb')
  })
  .catch((err) => console.log(err))

app.post('/save', async (req, res) => {
  const t = req.body.text
  await db.collection('notes').insertOne({ text: t, savedAt: new Date() })
  res.json({ msg: 'saved' })
})

app.listen(3000, () => {
  console.log('server running on port 3000')
})
