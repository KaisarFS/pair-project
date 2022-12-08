const { Router } = require('express')
const express = require('express')
const { itemForm } = require('../controllers/controller')
const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')
const router = express.Router()




//? ================= LOGIN & REGISTER =================
router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)
router.get('/logout', UserController.logout)

// router.use((req, res, next) => {
//     // console.log(req.session, '<------------');
//     if(!req.session.userId) {
//         const error = 'Login dulu boy!'
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }

//     console.log('Time2:', Date.now())
// })

//? ================= USER =================
const itemsRouter = require('./userRouter');
router.use('/user', itemsRouter)


// router.use((req, res, next) => {
//     // console.log(req.session, '<------------');
//     if(req.session.userId && req.session.role !== 'admin') {
//         const error = 'You have no access!'
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
    
//     console.log('Time:', Date.now())

// })

//? ================= ADMIN =================
router.get('/admin', UserController.renderAdmin)
router.get('/admin/update/:id', UserController.updateAdmin)
router.get('/admin/delete/:id', UserController.deleteUser)
router.get('/admin/create', UserController.renderCreateUser)
router.post('/admin/create', UserController.createUser)



module.exports = router