const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_pesan",
  {
    id_pesan: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUID,
      primaryKey: true
    },
    pemilik: {
      type: Sequelize.STRING
    },
    pembeli:{
      type: Sequelize.STRING
    },
    id_pembeli:{
      type:Sequelize.INTEGER
    },
    barang:{
      type: Sequelize.JSON
    },
    total:{
      type: Sequelize.STRING
    },
    status:{
      type:Sequelize.INTEGER
    },
    kirim:{
      type:Sequelize.INTEGER
    }
  },
  { timestamps: false }
);
