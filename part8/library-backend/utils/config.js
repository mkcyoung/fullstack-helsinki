require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

module.exports = {
  MONGODB_URI,
  JWT_SECRET
}