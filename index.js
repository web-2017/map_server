import express from 'express'
const app = express()
import cors from 'cors'
import morgan from 'morgan'

import dbConnection from './src/config/dbConnection.js'
// imports
import { PORT } from './src/config/keys.js'
import postRouter from './src/router/postRoute.js'

const port = PORT || 4000

// connection to database
dbConnection()

// setting
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

// routes
app.use('/api', postRouter)

// Listen Port
app.listen(port || 4000, () => console.log(`PORT listen ${port}`))
