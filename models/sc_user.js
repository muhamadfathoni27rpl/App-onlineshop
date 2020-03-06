const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user",
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID,
      primaryKey: true
    },
    nama: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    pw: {
      type: Sequelize.STRING
    },
    status_data:{
      type:Sequelize.INTEGER
    },
    datapc_user:{
      type:Sequelize.STRING
    },
    pp:{
      type:Sequelize.STRING
    },
    saldo:{
      type:Sequelize.INTEGER
    },
    hp:{
      type:Sequelize.STRING
    },
    alamat:{
      type:Sequelize.STRING
    },
    web:{
      type:Sequelize.STRING
    },
    verif_auth2:{
      type:Sequelize.STRING
    }
  },
  { timestamps: false }
);
