const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_saldos",
  {
    uuid_saldo: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID,
      primaryKey: true
    },
    saldo: {
      type: Sequelize.INTEGER
    }    
  },
  { timestamps: false }
);
