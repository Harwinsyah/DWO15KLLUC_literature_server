"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Literature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Literature.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });

      Literature.belongsToMany(models.User, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
        through: {
          model: "Collection",
          as: "info",
        },
      });
    }
  }
  Literature.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      publicationDate: DataTypes.DATE,
      pages: DataTypes.INTEGER,
      isbn: DataTypes.INTEGER,
      author: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("Waiting to be verifed", "Cancel", "Approved"),
        defaultValue: "Waiting to be verifed",
      },
      file: DataTypes.STRING,
      cover: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Literature",
    }
  );
  return Literature;
};
