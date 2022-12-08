const { User, Profile, Item } = require('../models')
const bcrypt = require('bcryptjs')
const sendMail = require('../helpers/nodemailer.js')
const { Op } = require('sequelize')
const moment = require('moment')
let idUser


class UserController {
    static loginForm(req, res) {
        const { error } = req.query
        res.render('login-form', { error })
    }

    static registerForm(req, res) {
        let { errors } = req.query
        res.render('register-form', { errors })
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
                // console.log(err);
                // res.send(err)
            if(err.name ==='SequelizeValidationError') {
                err = err.errors.map(el => el.message)
            }
            res.redirect(`/register?errors=${err}`)
            });
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
                        idUser = req.session.userId
                        
                        if (req.session.role === 'user') {
                            return res.redirect('/user/items')
                        } else if (req.session.role === 'admin') {
                            return res.redirect('/admin')
                        }


                    } else {
                        const error = 'Invalid Email or Password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'Invalid Email or Password'
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

    static updateAdmin(req, res) {
        const { id } = req.params
        
        User.update({ role: 'admin' }, {
            where: { id }
        })
        .then(() => {
            res.redirect('/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static renderCreateUser(req, res) {
        let { errors } = req.query
        res.render('admin-create', { errors })
    }

    static createUser(req, res) {
        const { email, password, role } = req.body
        User.create({email, password, role})
        .then(data => {
            res.redirect('/admin')
        })
        .catch(err => {
            if(err.name ==='SequelizeValidationError') {
                err = err.errors.map(el => el.message)
            }
            res.redirect(`/admin/create?errors=${err}`)
        })
    }

    static renderProfile(req, res) {
        const userId = req.session.userId
        console.log(userId, '<=========');
        Profile.findAll({
            where: { id: userId }
        })
        .then(data => {
            console.log(data, '<------- eaeaea');
            if(data.length === 0) {
                res.redirect('/user/profile/create')
            } else {
                res.render('user-profile', {data, moment})
            }
        })
        .catch(err => res.send(err))
    }

    static renderCreateProfile(req, res) {
        res.render('user-createProfile')
    }
    static addProfile(req, res) {
        const userId = req.session.userId
        const { fullName, profileImg, location, address } = req.body
        let data = {
            id: userId,
            fullName,
            profileImg,
            location,
            address,
            UserId: userId
        }
        // console.log(fullName, profileImg, location, address, '<========== REQ');
        Profile.create(data)
        .then(data => {
            res.redirect(`/user/profile/${userId}`)
        })
        .catch(err => res.send(err))
    }

    static animalList(req, res) {
        console.log(req.query);
        let name = req.query.name
    
        let option = {
          include: {
            model: User,
            include: Profile
          },
          where: {
            UserId: idUser
          }
        }
    
        if (name) {
          option.where.name = {
            [Op.iLike]: `%${name}%`
          }
        }
    
        Item.findAll(option)
          .then((result) => {
            return Item.formatAge(result)
        })
        .then(data => {
            // res.send(data)
            res.render('items-list', { result: data, idUser})
          })
          .catch((err) => {
            res.send(err)
          });
      }

     
}

module.exports = UserController