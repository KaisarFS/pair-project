const express = require('express');
const Controller = require('../controllers/controller');
const UserController = require('../controllers/UserController');
const router = express.Router()

router.get('/items', UserController.animalList)
router.get('/items/add', Controller.itemForm)
router.post('/items/add', Controller.addItem)
router.get('/items/:id/delete', Controller.deleteItem)
// router.get('/items/:id/edit', Controller.renderEdit)
// router.post('/items/:id/edit', Controller.editItem)
router.get('/profile/create', UserController.renderCreateProfile)
router.post('/profile/create', UserController.addProfile)
router.get('/profile/:id', UserController.renderProfile)


module.exports = router