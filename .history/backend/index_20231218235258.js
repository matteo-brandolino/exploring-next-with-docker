const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use(cors())

app.get('/test', (req, res) => {
    try {
        res.status(200).json({message: 'API is working'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json({message: users})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).json({message: user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
            }
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
            }
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).json({message: user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))