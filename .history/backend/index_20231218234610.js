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
        
    }
})
