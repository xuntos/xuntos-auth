import { Router } from 'express'
import pingHandler from './handlers/ping'
import createAuthenticationRequestHandler from './handlers/create-authentication-request'
import retrieveAuthenticationRequestHandler from './handlers/retrieve-authentication-request'
import validateAuthenticationRequestHandler from './handlers/validate-authentication-request'
import userMeHandler from './handlers/user-me'
import channelsHandler from './handlers/channels'

const router = Router()

router.get('/ping', pingHandler)
router.get('/channels', channelsHandler)
router.post('/authentication-request', createAuthenticationRequestHandler)
router.get('/authentication-request/:uuid', retrieveAuthenticationRequestHandler)
router.post('/authentication-request/:uuid/validate', validateAuthenticationRequestHandler)
router.get('/users/me', userMeHandler)

export default router
