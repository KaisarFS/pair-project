const { User } = require('../models')
const bcrypt = require('bcryptjs')
const sendMail = require('../helpers/nodemailer.js')

class UserController {
    static loginForm(req, res) {
        const { error } = req.query
        res.render('login-form', { error })
    }

    static registerForm(req, res) {
        res.render('register-form')
    }

    static postRegister(req, res) {
        const { email, password, role } = req.body
        User.create({ email, password, role })
            .then(newUser => {
                sendMail(newUser.email)
                res.redirect('/login')
                // res.send(newUser)
            })
            .catch(err => {
                console.log(err);
                // res.send(err)
            })
    }

    static postLogin(req, res) {
        const { email, password } = req.body
        console.log(req.body)
        User.findOne({ where: { email } })
            .then(user => {
                console.log('hi2')
                if (user) {
                    console.log('hi')
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    console.log(isValidPassword)
                    if (isValidPassword) {

                        req.session.userId = user.id
                        req.session.role = user.role

                        if (req.session.role === 'user') {
                            return res.redirect('/user/items')
                        } else if (req.session.role === 'admin') {
                            return res.redirect('/admin')
                        }


                    } else {
                        const error = 'invalid username / password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'invalid username / password'
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => res.send(err))
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) res.send(err);
            else {
                res.redirect('/login')
            }
        })
    }

    static renderAdmin(req, res) {
        // res.render('admin-page')
        User.findAll()
        .then((data) => {
            res.render('admin-page', { data })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }

    static deleteUser(req, res) {
        const { id } = req.params
        User.destroy({ where: { id } })
        .then(() => {
            res.redirect('/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static renderCreateUser(req, res) {
        res.render('admin-create')
    }

    static createUser(req, res) {
        const { email, password, role } = req.body
        User.create({email, password, role})
        .then(data => {
            res.redirect('/admin')
        })
        .catch(err => res.send(err))
    }
}

module.exports = UserController