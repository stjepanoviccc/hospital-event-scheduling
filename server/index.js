const express = require('express')
const path = require('path');
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const connectDB = require('./database/connection')
const route = require('./routes')

const app = express()

dotenv.config({ path: 'config.env' })

const port = process.env.PORT || 3000
const client = process.env.CLIENT || 'http://localhost:80'

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))

const corsOptions = {
  origin: client,
  credentials: true,
}

app.use(cors(corsOptions))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300, 
})
app.use(limiter)

app.use('/api/v1', route)

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack); 
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...')
  app.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

app.listen(port, () => {
  console.log(`Server is running on port:${port}`)
})