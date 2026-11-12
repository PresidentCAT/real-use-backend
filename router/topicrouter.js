const express = require('express')
const router = express.Router()
const ctrl = require('../controller/topiccontroller')
const { vrftoken, role } = require('../middleware/auth_middleware')

router.use(vrftoken)

// ทุกคนที่ล็อกอินดูได้
router.get('/getall', ctrl.getall)
router.get('/getbyid/:id', ctrl.getbyid)

// เฉพาะ hr แก้ไขได้
router.post('/create', role('hr'), ctrl.create)
router.put('/update/:id', role('hr'), ctrl.updatetopics)
router.delete('/remove/:id', role('hr'), ctrl.remove)

module.exports = router
