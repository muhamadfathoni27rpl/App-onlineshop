const koneksi = require("../models/sc_user"),
  nonono = "EMAIL @ GMAIL.COM",
  nononono = "PASSWORD",
  genret_star = require("star-ratings"),
  barang_ = require("../models/sc_barang"),
  ss = require("../models/database.js"),
  ml = require("nodemailer"),
  kategori_ = require("../models/sc_kategori"),
  rate = require("../models/sc_rating"),
  pesan_ = require("../models/sc_pesanan"),
  keranjang = require("../models/sc_keranjang");

exports.get_barang = (req, res) => {
  var pemilik = req.decoded.email;
  koneksi.findOne({ where: { uuid: pemilik } }).then(user => {
    if (user) {
      var sql =
          "SELECT user_barangs.uuid_barang , user_barangs.barang , user_barangs.harga , user_barangs.stok , user_barangs.foto , nama , kategori FROM user_barangs INNER JOIN users ON user_barangs.uuid_pemilik=users.uuid INNER JOIN user_kategoris ON user_barangs.uuid_kategori=user_kategoris.uuid_kategori WHERE uuid_pemilik = ?";
      //          selek barang. id  + barang . nama barang + barang . harga + (tabel user).nama + (tabel kategori).kategori
      ss.db.query(sql, user.uuid, (err, ok) => {
        res.render("barang", { ok: ok });
      });
    }
  });
};

exports.barang = (req, res) => {
  var pemilik = req.decoded.email;
  koneksi.findOne({ where: { uuid: pemilik } }).then(barang => {
    if (barang) {
      const id_wong = barang.uuid;
      const acak = Math.floor(Math.random() * Math.floor(999999));
      var barangs = {        
        barang: req.body.barang,
        desk:req.body.deskripsi,
        harga: req.body.harga,
        uuid_pemilik: id_wong,
        uuid_kategori: req.body.kategori,
        stok: req.body.stok,
        foto: req.file.filename,
        rating:acak,
      };
      // console.log(barangs.desk);
      barang_.findOne().then(yo => {                
        barang_.create(barangs).then(mari => {                    
          rate.create({id_barang:barangs.rating}).then(ratesss=>{
          req.session.message = {
            type: "success",
            intro: "Sukses",
            message: "Berhasil Menambahkan Barang"
          };
          res.redirect("/user/get_barang");
        })
        });
      });
    }
  }).catch;
};

exports.hapus = (req, res) => {
  var id = req.params.id;
  var id_user = req.decoded.email;
  barang_
    .findOne({ where: { uuid_barang: id } })
    .then(def_barang => {
      koneksi.findOne({ where: { uuid: id_user } }).then(usr => {
        if (usr.uuid == def_barang.uuid_pemilik) {
          barang_.destroy({ where: { uuid_barang: id } });
          req.session.message = {
            type: "success",
            intro: "Sukses",
            message: "Berhasil Menghapus Barang"
          };
          res.redirect("/user/get_barang");
        } else {
          req.session.message = {
            type: "danger",
            intro: "ERROR !",
            message: "Anda tidak memiliki barang tersebut"
          };
          res.redirect("/user/get_barang");
        }
      });
    })
    .catch(err_barang => {
      req.session.message = {
        type: "danger",
        intro: "ERROR !",
        message: "Anda tidak memiliki barang tersebut"
      };
      res.redirect("/user/get_barang");
    });
};

exports.update_barang = (req, res) => {
  var pemilik = req.decoded.email;
  koneksi.findOne({ where: { uuid: pemilik } }).then(ok => {
    var info = req.body.barang_1; //nama barang sebelum e
    const data = {
      barang: req.body.barang_2,
      harga: req.body.harga,
      uuid_kategori: req.body.kategori,
      stok: req.body.stok
    };
    barang_
      .findOne({ where: { barang: info } })
      .then(s1 => {
        if (s1 == null) {
          req.session.message = {
            type: "danger",
            intro: "ERROR !",
            message: "Barang Tidak ada"
          };
        } else {
          if (s1.uuid_pemilik == ok.uuid) {
            barang_.update(data, { where: { barang: info } }).then(mari => {
              req.session.message = {
                type: "success",
                intro: "Sukses",
                message: "Berhasil Update barang"
              };
              res.redirect("/user/get_barang");
            });
          } else {
            req.session.message = {
              type: "danger",
              intro: "ERROR !",
              message: "Anda tidak memiliki barang tersebut"
            };
            res.redirect("/user/get_barang");
          }
        }
      })
      .catch(els => {
        req.session.message = {
          type: "danger",
          intro: "ERROR !",
          message: "Anda tidak memiliki barang tersebut"
        };
        res.redirect("/user/get_barang");
      });
  });
};

// TOKO
exports.toko = (req, res) => {
  koneksi.findOne({ where: { uuid: req.decoded.email } }).then(ok => {
    var sql =
      "SELECT user_barangs.uuid_barang , user_barangs.barang , user_barangs.harga , user_barangs.stok,user_barangs.desk , user_barangs.foto , user_barangs.rating , nama , kategori , b1,b2,b3,b4,b5,total_rate,total_rateWong"
      +" FROM user_barangs INNER JOIN users ON user_barangs.uuid_pemilik=users.uuid"
      +" INNER JOIN user_kategoris ON user_barangs.uuid_kategori=user_kategoris.uuid_kategori "
      +" INNER JOIN user_rates ON user_barangs.rating = user_rates.id_barang";
    ss.db.query(sql, (err, ok) => {     
      for (let a = 0; a < ok.length; a++) {
        var b1 = ok[a].b1,
            b2 = ok[a].b2,
            b3 = ok[a].b3,
            b4 = ok[a].b4,
            b5 = ok[a].b5
        var votes = [b1, b2, b3, b4, b5];
        
        var bintang = {total_rate : genret_star(votes),total_rateWong:(b1+b2+b3+b4+b5)+" Orang Menilai"}
        // console.log(ok[a].rating);
        // rate.findOne({where:{id_barang:ok[a].rating}}).then(asd=>{console.log(asd);})
        rate.update(bintang,{where:{id_barang:ok[a].rating}})        
      }    
         
      res.render("toko", { ok: ok });
    });
  });
};
