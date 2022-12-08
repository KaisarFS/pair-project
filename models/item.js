'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User)
    }

    static formatAge(data) {
      let result = []
      data = data.map(el => {
        if(el.age < 1) {
          el.age = `${el.age} - Muda`
          result.push(el)
        } else {
          el.age = `${el.age} - Tua`
          result.push(el)
        }
      })
      return result 
    }

    priceFormat() {
      return this.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })

    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama harus diisi!'},
        notEmpty: { msg: 'Nama harus diisi!' }
      }
    },
    age: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: { msg: 'Age harus diisi!'},
        notEmpty: { msg: 'Age harus diisi!' }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Category harus diisi!'},
        notEmpty: { msg: 'Category harus diisi!' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Price harus diisi!'},
        notEmpty: { msg: 'Price harus diisi!' }
      }
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: { msg: 'Weight harus diisi!'},
        notEmpty: { msg: 'Weight harus diisi!' }
      }
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Photo URL harus diisi!'},
        notEmpty: { msg: 'Photo URL harus diisi!' }
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Description harus diisi!'},
        notEmpty: { msg: 'Description harus diisi!' }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama pemilik harus diisi!'},
        notEmpty: { msg: 'Nama pemilik harus diisi!' }
      }
    },
    isSold: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Item',
  });

  Item.beforeCreate((item, options) => {
    item.isSold = false
  });
  return Item;
};