const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_favorit",
  {
    id_love: {
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
    harga_barang:{
        type:Sequelize.INTEGER
    },
    id_user:{
      type:Sequelize.INTEGER
    },
    gambar:{
      type:Sequelize.STRING
    }
  },
  { timestamps: false }
);
