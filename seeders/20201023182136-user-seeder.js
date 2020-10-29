"use strict";
const bycript = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Administrator",
          email: "admin@gmail.com",
          password: await bycript.hash("admin123", 10),
          gender: "male",
          role: "admin",
          phone: "082112344321",
          address: "Jl. H. Supu Yusuf No. 20 Kendari",
          picture: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Harwinsyah Haris",
          email: "user@gmail.com",
          password: await bycript.hash("user123", 10),
          gender: "male",
          role: "user",
          phone: "082191924609",
          address: "Jl. H. Supu Yusuf No. 20 Kendari",
          picture: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
