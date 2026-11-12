const express = require('express')
const router = express.Router()
const ctrl = require('../controller/indicatorcontroller')
const { vrftoken, role } = require('../middleware/auth_middleware')

router.use(vrftoken)

router.get('/getall', ctrl.getall)
router.get('/getbyid/:id', ctrl.getbyid)

router.post('/create', role('hr'), ctrl.create)
router.put('/updateindicator/:id', role('hr'), ctrl.updateindicator)
router.delete('/remove/:id', role('hr'), ctrl.remove)

module.exports = router
