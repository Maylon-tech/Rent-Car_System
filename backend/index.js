import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import userRoute from './routes/userRoute.js'
import CarRouter from './routes/carRoute.js'
import ClientRouter from './routes/clientRoute.js'
import serviceRouter from './routes/serviceRoute.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 7007

app.use("/api/auth", userRoute)
app.use("/api/cars", CarRouter)
app.use("/api/clients", ClientRouter)
app.use("/api/services", serviceRouter)

app.listen(PORT, () => {
    connectDB()
    console.log("Server connected on port", PORT)
})
