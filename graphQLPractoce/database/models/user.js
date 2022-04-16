'use strict';
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // obj로 하지 않는 이유는?
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      defaultScope: {
        rawAttributes: { exclude: ['password'] },
      },
    }
  );
  // Added the defaultScope options to ensure that the password is not returned as part of the JSON result when the User model is queried.
  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });
  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  };
  // Added beforeCreate hook which automatically hashes the password using bcrypt.js under the hood

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  };
  // Defined the many-to-many relationship between User and Post. A user has many posts.

  //! 기본setting
  // class User extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // User.init(
  //   {
  //     name: DataTypes.STRING,
  //     email: DataTypes.STRING,
  //     password: DataTypes.STRING,
  //   },
  //   {
  //     sequelize,
  //     modelName: 'User',
  //   }
  // );
  return User;
};
