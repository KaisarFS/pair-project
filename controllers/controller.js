const { where } = require('sequelize');
const { User, Profile, Item} = require('../models');


class Controller {
    static renderHome(req, res) {
        res.render('home')
    }

    static deleteItem(req, res) {
        Item.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(() => {
            res.redirect('/user/items')
          })
          .catch((err) => {
            res.send(err)
          });
      }
    
      // static itemForm(req, res) {
      //   let { errors } = req.query
      //   Profile.findAll()
      //     .then((result) => {
      //       res.render('items-form', { result, errors })
      //       // res.send(result)
      //     })
      //     .catch((err) => {
      //       res.send(err)
      //     });
      // }
    
      static addItem(req, res) {
        const newData = {
          name: req.body.name,
          age: req.body.age,
          category: req.body.category,
          price: req.body.price,
          weight: req.body.weight,
          img: req.body.img,
          description: req.body.description,
          UserId: req.body.UserId
        }
    
        Item.create(newData)
          .then(() => {
            res.redirect('/user/items')
          })
          .catch((err) => {
            // res.send(err)
            if(err.name ==='SequelizeValidationError') {
              err = err.errors.map(el => el.message)
          }
          res.redirect(`/user/items/add?errors=${err}`)
          });
      }

      // static renderEdit(req, res) {
      //   const { id } = req.params
      //   Profile.findAll({
      //     include: {
      //       model: User,
            
      //       include: {
      //         model: Item
      //       }
      //     },
      //   }, {
      //     where: {id}
          
      //   })
      //     .then((result) => {
      //       // res.render('items-edit', { result })
      //       res.send(result)
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       res.send(err)
      //     });
      // }
}

module.exports = Controller