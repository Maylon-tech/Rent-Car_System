import express from 'express'
import { createService, removeService, serviceData, updateService } from '../controllers/serviceController.js'

const serviceRouter = express.Router()

serviceRouter.post("/newService", createService)
serviceRouter.put("/editService", updateService)
serviceRouter.delete("/removeService", removeService) 
serviceRouter.get("/serviceData", serviceData)

export default serviceRouter
