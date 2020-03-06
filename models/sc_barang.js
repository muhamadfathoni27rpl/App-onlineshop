const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_barang",
  {
    uuid_barang: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID,
      primaryKey: true
    },
    barang: {
      type: Sequelize.STRING
    },
    desk:{
      type:Sequelize.TEXT
    },
    uuid_pemilik:{
      type: Sequelize.STRING
    },
    harga:{
      type: Sequelize.STRING
    },
    uuid_kategori:{
      type:Sequelize.INTEGER
    },
    stok:{
      type:Sequelize.INTEGER
    },
    foto:{
      type:Sequelize.STRING
    },
    rating:{
      type:Sequelize.INTEGER
    }
  },
  { timestamps: false }
);
