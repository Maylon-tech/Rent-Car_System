import express from 'express'
import { clientData, createClient, removeClient, updateClient } from '../controllers/clientController.js'

const ClientRouter = express.Router()

ClientRouter.post("/newClient", createClient)
ClientRouter.put("/editClient/:id", updateClient)
ClientRouter.delete("/removeClient/:id", removeClient) 
ClientRouter.get("/clientData", clientData)

export default ClientRouter
