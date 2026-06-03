import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

const url = 'mongodb+srv://arnabacharya1612_db_use:test123@ac-wzo6xjz.8peoruq.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)

async function start() {
  await client.connect()
  console.log('connected to mongodb')

  const db = client.db('vinotes')

  // register
  app.post('/register', async (req, res) => {
    const n = req.body.name
    const e = req.body.email
    const p = req.body.password

    const found = await db.collection('users').find({ email: e }).toArray()
    if (found.length > 0) {
      res.json({ msg: 'user already exists' })
      return
    }

    await db.collection('users').insertOne({ name: n, email: e, password: p })
    console.log('new user registered')
    res.json({ msg: 'registered ok' })
  })

  // login
  app.post('/login', async (req, res) => {
    const e = req.body.email
    const p = req.body.password

    const found = await db.collection('users').find({ email: e, password: p }).toArray()
    if (found.length == 0) {
      res.json({ msg: 'wrong email or password' })
      return
    }

    console.log('user logged in')
    res.json({ msg: 'login ok', userId: found[0]._id })
  })

  // save note
  app.post('/save', async (req, res) => {
    try {
      const t = req.body.text
      const u = req.body.userId
      await db.collection('notes').insertOne({ text: t, userId: u, savedAt: new Date() })
      res.json({ msg: 'saved' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: 'error' })
    }
  })

  app.listen(3000, () => {
    console.log('server running on port 3000')
  })
}

start()
