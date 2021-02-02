import { Router } from 'express'
import pingHandler from './handlers/ping'
import channelsHandler from './handlers/channels'
import AuthenticationRequestHandler from './handlers/authentication-request'
import UserHandler from './handlers/user'
import TokensHandler from './handlers/tokens'

const router = Router()

router.get('/ping', pingHandler)
router.get('/channels', channelsHandler)
router.post('/authentication-request', AuthenticationRequestHandler.create)
router.get('/authentication-request/:uuidOrUserURI', AuthenticationRequestHandler.retrieve)
router.post('/authentication-request/:uuidOrUserURI/validate', AuthenticationRequestHandler.validate)
router.get('/users/me', UserHandler.me)
router.get('/tokens/validate', TokensHandler.validate)
router.post('/tokens/refresh', TokensHandler.refresh)

export default router
