import mongoose from 'mongoose'

const carsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        model: {
            type: String,
            required: true,
            unique: true,
        },
        year: {
            type: Number,
            required: true,
            unique: true,
        },
        color: {
            type: String,
            required: true,          
        },      
        status: {
            type: String,
            required: true,    
        }
    },
    { timestamps: true }
)

const Cars = mongoose.model("Cars", carsSchema)

export default Cars
