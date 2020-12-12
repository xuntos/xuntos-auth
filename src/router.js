import { Router } from 'express'
import pingHandler from './handlers/ping'

const router = Router()

router.get('/ping', pingHandler)

export default router
