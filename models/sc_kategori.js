const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_kategori",
  {
    uuid_kategori: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID,
      primaryKey: true
    },
    kategori: {
      type: Sequelize.STRING
    }    
  },
  { timestamps: false }
);
