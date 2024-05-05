import express from 'express'
import authRouter from './routes/auth_routes'

const app = express()
app.use('/auth', authRouter)
app.listen(3000, ()=> console.log("app is listening"))