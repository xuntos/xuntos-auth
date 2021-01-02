import { Router } from 'express'
import pingHandler from './handlers/ping'
import createAuthenticationRequestHandler from './handlers/create-authentication-request'
import channelsHandler from './handlers/channels'

const router = Router()

router.get('/ping', pingHandler)
router.post('/authentication-request', createAuthenticationRequestHandler)
router.get('/channels', channelsHandler)

export default router
