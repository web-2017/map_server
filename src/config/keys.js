import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 4000
export const MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost:27017/map'
