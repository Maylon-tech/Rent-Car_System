import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        city: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        cellPhone: {
            type: Number,
            required: true,          
        },      
        status: {
            type: String,
            required: true,    
        }
    },
    { timestamps: true }
)

const Client = mongoose.model("Client", clientSchema)

export default Client
