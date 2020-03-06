const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_rate",
  {
    id_rate: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUID,
      primaryKey: true
    },
    id_barang:{
      type: Sequelize.INTEGER
    },
    b1:{
      type:Sequelize.INTEGER
    },
    b2:{
        type:Sequelize.INTEGER
    },
    b3:{
        type:Sequelize.INTEGER
    },
    b4:{
        type:Sequelize.INTEGER
    },
    b5:{
        type:Sequelize.INTEGER
      },
    total_rate:{
      type:Sequelize.STRING
    },
    total_rateWong:{
      type:Sequelize.STRING
    }
  },
  { timestamps: false }
);
