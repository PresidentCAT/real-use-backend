const express = require('express')
const router = express.Router()
const ctrl = require('../controller/indicatorcontroller')
const { vrftoken, role} = require('../middleware/auth_middleware')

router.use(vrftoken, role('hr'))
router.get('/getall',ctrl.getall)
router.get('/getbyid',ctrl.getbyid)

router.post('/create',ctrl.create)

router.put('/updateindicator', ctrl.updateindicator)

router.delete('/remove/:id', ctrl.remove)

module.exports = router;
