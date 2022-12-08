const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()

router.get('/items', Controller.animalList)
router.get('/items/add', Controller.itemForm)
router.post('/items/add', Controller.addItem)
router.get('/profile/:id', Controller.renderProfile)

module.exports = router