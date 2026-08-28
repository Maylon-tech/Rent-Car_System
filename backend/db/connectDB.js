import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI

        if (!mongoUri) {
            throw new Error("MONGO_URI is missing in .env")
        }

        if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
            throw new Error("MONGO_URI must start with mongodb:// or mongodb+srv://")
        }

        await mongoose.connect(mongoUri)
        console.log("Database connected")
    } catch (error) {
        console.error("Cannot connect to DB:", error.message)
        process.exit(1)
    }
}

export default connectDB