import express from 'express'
import { createUser, loginUser, logoutUser, updateUserProfile, userProfile } from '../controllers/userController.js'

const router = express.Router()

router.post("/userRegister", createUser)
router.post("/userLogin", loginUser)
router.post("/userLogout", logoutUser) 
router.get("/profile", userProfile)
router.put("/updateUser/:id", updateUserProfile)

export default router
