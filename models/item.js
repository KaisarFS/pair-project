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

    priceFormat() {
      return this.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })

    }
  }
  Item.init({
    name: DataTypes.STRING,
    age: DataTypes.DECIMAL,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    weight: DataTypes.DECIMAL,
    img: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
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