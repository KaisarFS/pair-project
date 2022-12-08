'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      User.hasMany(models.Item)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email harus diisi!'},
        notEmpty: { msg: 'Email harus diisi!' },
        isEmail: { msg: 'format email tidak valid!' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password harus diisi!'},
        notEmpty: { msg: 'Password harus diisi!' },
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash

        if(!instance.role) {
          instance.role = 'user'
        } else {
          instance.role = 'admin'
        }
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};