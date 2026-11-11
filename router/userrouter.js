const express = require('express')
const router = express.Router()
const ctrl = require('../controller/usercontroller')
const { vrftoken, role} = require('../middleware/auth_middleware')

router.use(vrftoken, role('noob'))

router.get('/getall',ctrl.getall)
router.get('/getbyid',ctrl.getbyid)

router.post('/create',ctrl.create)

router.put('/updateuser',ctrl.updateuser)
router.put('/updatepassword', ctrl.updatepassword)

router.delete('/remove', ctrl.remove)

module.exports = router;