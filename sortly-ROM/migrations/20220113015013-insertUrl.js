"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("urls", "userId", Sequelize.INTEGER);
    await queryInterface.addConstraint("urls", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_id",
      references: {
        table: "user",
        filed: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint("urls", "user_id");
    queryInterface.removeColumn("urls,userId");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
