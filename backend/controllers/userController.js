import bcrypt from 'bcryptjs'
import User from '../models/userModels.js'

export const createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Nome, e-mail, senha e confirmação de senha são obrigatórios.' })
        }

        // if (password !== confirmPassword) {
        //     return res.status(400).json({ message: 'As senhas não coincidem.' })
        // }

        const existingUser = await User.findOne({ $or: [{ email }, { name }] })

        if (existingUser) {
            return res.status(409).json({ message: 'Já existe uma conta com este e-mail ou nome.' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })
        await newUser.save()

        res.status(201).json({
            message: 'Usuário criado com sucesso.',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' })
        }

        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}


export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Logout realizado com sucesso.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

export const userProfile = async (req, res) => {

    try {
        const user = await User.find({ })

        res.status(201).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const updateUserProfile = async (req, res) => {
    const { name, email } = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true })

        res.status(201).json(updateUser)
    } catch (error) {
        res.status(404).json({ message: "Internal server error." })
    }
}