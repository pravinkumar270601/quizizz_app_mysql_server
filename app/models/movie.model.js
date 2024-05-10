const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
  const expense = sequelize.define("expensetracker_t_movie_m", {
    movie_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    movie_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active_status: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },

    delete_status: {
      type: Sequelize.TINYINT,
      alloweNull: false,
      defaultValue: 0,
    },
    created_on: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      // defaultValue: Sequelize.literal("CURRENT_DATE"), // set default value to current date
      // get() {
      //   // Custom getter to format the date as required
      //   const rawValue = this.getDataValue("created_on");
      //   if (rawValue) {
      //     return moment(rawValue).format("DD MMM YYYY");
      //   }
      //   return null;
      // },
    },
    updated_on: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
  });

  return expense;
};
