const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_keranjang",
  {
    id_cart: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUID,
      primaryKey: true
    },
    uuid_barang: {
      type: Sequelize.INTEGER
    },
    nama_barang:{
        type:Sequelize.STRING
    },
    total_barang:{
        type:Sequelize.INTEGER
    },
    harga_total:{
        type:Sequelize.INTEGER
    },
    nama_pembeli:{
      type:Sequelize.STRING
    },gambar:{
      type:Sequelize.STRING
    },harga:{
      type:Sequelize.INTEGER
    },admin:{
      type:Sequelize.STRING
    }
  },
  { timestamps: false }
);
