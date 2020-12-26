import { Router } from 'express'
import pingHandler from './handlers/ping'
import requestHandler from './handlers/request'
import channelsHandler from './handlers/channels'

const router = Router()

router.get('/ping', pingHandler)
router.post('/request', requestHandler)
router.get('/channels', channelsHandler)

export default router
