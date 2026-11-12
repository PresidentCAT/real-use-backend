const express = require('express')
const router = express.Router()
const ctrl = require('../controller/usercontroller')
const { vrftoken, role } = require('../middleware/auth_middleware')

router.use(vrftoken, role('user'))

router.get('/getall', ctrl.getall)
router.get('/getbyid/:id', ctrl.getbyid)

router.post('/create', ctrl.create)

router.put('/updateuser/:id', ctrl.updateuser)
router.put('/updatepassword/:id', ctrl.updatepassword)

router.delete('/remove/:id', ctrl.remove)

module.exports = router
