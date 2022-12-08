'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Full name harus diisi!'},
        notEmpty: { msg: 'Full name harus diisi!' }
      }
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image Url harus diisi!'},
        notEmpty: { msg: 'Image Url harus diisi!' }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Location harus diisi!'},
        notEmpty: { msg: 'Location harus diisi!' }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Address harus diisi!'},
        notEmpty: { msg: 'Address harus diisi!' }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User harus diisi!'},
        notEmpty: { msg: 'User harus diisi!' }
      }
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};