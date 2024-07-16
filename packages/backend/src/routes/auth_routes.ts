import express from 'express'
import auth from '../controllers/auth'
import { Router } from 'express-serve-static-core'

const router = express.Router()
const routerBetterTyping = router as unknown as Router

routerBetterTyping.post('/login', auth.login)
routerBetterTyping.post('/logout', auth.logout)
routerBetterTyping.post('/register', auth.register)

export default router