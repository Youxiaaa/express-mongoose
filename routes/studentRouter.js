const studentsControllers = require('../controllers/studentsController')

const router = require('express').Router()

router.get('/', studentsControllers.getAllUsers)
router.post('/', studentsControllers.createUser)
router.put('/:id', studentsControllers.updateUser)
router.delete('/:id', studentsControllers.deleteUser)

module.exports = router