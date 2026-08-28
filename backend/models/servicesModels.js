import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
    {
        client: {
            type: String,
            required: true,
            unique: true,
        },
        car: {
            type: String,
            required: true,
            unique: true,
        },
        services: {
            type: String,
            required: true,           
        },
        dateIn: {
            type: Date,
            required: true,          
        },      
        dateOut: {
            type: Date,
            required: true,    
        }
    },
    { timestamps: true }
)

const Service = mongoose.model("Service", serviceSchema)

export default Service
