const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');
const connectDB = require('./database/connection')
const route = require('./routes')

const app = express()

dotenv.config({ path: 'config.env' })

const port = process.env.PORT || 3000
const client = process.env.CLIENT || 'http://localhost:80'

connectDB()

app.use(bodyParser.json())

const corsOptions = {
  origin: client,
  credentials: true,
}

app.use(cors(corsOptions))

app.use('/api/v1', route)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});