module.exports = (sequelize, Sequelize) => {
  const expense = sequelize.define("expensetracker_t_shootingspot_m", {
    spot_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    movie_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "expensetracker_t_movie_m",
        key: "movie_id",
      },
      allowNull: true,
    },
    contact_no: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    active_status: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    delete_status: {
      type: Sequelize.TINYINT,
      alloweNull: true,
      defaultValue: 0,
    },
    created_on: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.literal("CURRENT_DATE"), // set default value to current date
      get() {
        // Custom getter to format the date as required
        const rawValue = this.getDataValue("created_on");
        if (rawValue) {
          return moment(rawValue).format("DD MMM YYYY");
        }
        return null;
      },
    },
    updated_on: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
  });

  return expense;
};
