import express from 'express'
import {  } from '../controllers/userController.js'
import { carsData, createCar, removeCar, updateCar } from '../controllers/carController.js'

const CarRouter = express.Router()

CarRouter.post("/newCar", createCar)
CarRouter.put("/updateCar/:id", updateCar)
CarRouter.delete("/deleteCar/:id", removeCar) 
CarRouter.get("/carsData", carsData)

export default CarRouter
