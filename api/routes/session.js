const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const {
  createDemoSession,
  getAttendanceForSession,
} = require('../controller/session')

const router = express.Router()

router.post('/create-demo',
validator().validate({
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      roomId: { type: 'number' },
    },
    required: ['roomId'],
  },
}),
createDemoSession)

router.get(
  '/:sessionId/attendances',
  validator().validate({
    params: {
      type: 'object',
      additionalProperties: false,
      properties: {
        sessionId: { type: 'string' },
      },
      required: ['sessionId'],
    },
  }),
  wa(getAttendanceForSession)
)

module.exports = router
