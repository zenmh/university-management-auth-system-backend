import { Router } from 'express'
import { createUsetToDB } from './users.controller'

const router = Router()

router.post('/create_user', createUsetToDB)

export default router
