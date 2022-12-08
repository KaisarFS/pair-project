const { User, Profile, Item} = require('../models');

class Controller {
    static renderHome(req, res) {
        res.render('home')
    }

    // static renderProfile(req, res) {
    //     // res.render('user-profile')
    //     Profile.findAll()
    //     .then(data => {
    //         res.send(data)
    //     })
    //     .catch(err => res.send(err))
    // }

    // static animalList(req, res) {
    //     console.log(req.query);
    //     let name = req.query.name
    
    //     let option = {
    //       include: {
    //         model: User,
    //         include: Profile
    //       },
    //       where: {}
    //     }
    
    //     if (name) {
    //       option.where.name = {
    //         [Op.iLike]: `%${name}%`
    //       }
    //     }
    
    //     Item.findAll(option)
    //       .then((result) => {
    //         return Item.formatAge(result)
    //     })
    //     .then(data => {
    //         // res.send(data)
    //         res.render('items-list', { result: data })
    //       })
    //       .catch((err) => {
    //         res.send(err)
    //       });
    //   }
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
    
      static itemForm(req, res) {
        Profile.findAll()
          .then((result) => {
            res.render('items-form', { result })
            // res.send(result)
          })
          .catch((err) => {
            res.send(err)
          });
      }
    
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
            res.send(err)
          });
      }
}

module.exports = Controller