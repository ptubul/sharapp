import express from 'express'
import auth from '../controllers/auth'

const router = express.Router()

router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.post('/register', auth.register)

export default router