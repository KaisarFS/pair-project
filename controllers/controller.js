const { User, Profile, Item} = require('../models')

class Controller {
    static renderHome(req, res) {
        res.render('home')
    }

    static renderProfile(req, res) {

        // res.render('user-profile')
    }

    static animalList(req, res) {
        console.log(req.query);
        let name = req.query.name
    
        let option = {
          include: {
            model: User,
            include: Profile
          },
          where: {}
        }
    
        if (name) {
          option.where.name = {
            [Op.iLike]: `%${name}%`
          }
        }
    
        Item.findAll(option)
          .then((result) => {
            // result = result.map (el => {
            //     return el.User
            // })
            // res.send(result.forEach(el => 
            //          el.User.Profile))
            // res.send(result)
            // console.log(result[0].User.Profile.fullName, '<-----------------------');
            res.render('items-list', { result })
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