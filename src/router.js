import { Router } from 'express'
import pingHandler from './handlers/ping'
import requestHandler from './handlers/request'

const router = Router()

router.get('/ping', pingHandler)
router.post('/request', requestHandler)

export default router
