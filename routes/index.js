const { Router } = require('express')
const express = require('express')
const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')
const router = express.Router()

router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)

router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)

router.use((req, res, next) => {
    console.log(req.session, '<------------');
    if(!req.session.userId) {
        const error = 'Login dulu boy!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }

    console.log('Time:', Date.now())
    next()
})

router.get('/logout', UserController.logout)


router.get('/', Controller.renderHome)

module.exports = router