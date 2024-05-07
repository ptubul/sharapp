import express from 'express'
import authRouter from './routes/auth_routes'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import env from 'dotenv'

env.config()
const db = mongoose.connection
db.once("open", ()=>console.log("DB connected"));
db.on("error", (error) => console.error(error));
const url = process.env.DB_URL
mongoose.connect(url).then(()=>{
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/auth', authRouter)
    app.listen(3000, ()=> console.log("app is listening"))
})

