const koneksi = require("../models/sc_user"),  
  barang_ = require("../models/sc_barang"),
  ss = require("../models/database.js"),    
  love = require("../models/sc_favor"),
  keranjang = require("../models/sc_keranjang")  

exports.keranjang = (req, res) => {
    koneksi.findOne({ where: { uuid: req.decoded.email } }).then(ok => {    
        var id = ok.uuid;              
        var sql = "SELECT * FROM user_keranjangs WHERE nama_pembeli = ?";
        ss.db.query(sql, id , (err, oks) => {                  
          var sqe = "SELECT SUM (`harga_total`) as tes FROM user_keranjangs WHERE nama_pembeli = ?";
          ss.db.query(sqe, id, (err, oke) => {               
              res.render("keranjang",{ oyi: oks ,total:oke[0],data:oks[0]});
          });      
      });
    });
  };

exports.keranjang_tambah = (req, res) => {
    var productId = req.params._id;
    barang_.findOne({ where: { uuid_barang: productId } }).then(ok => {
      koneksi.findOne({ where: { uuid: ok.uuid_pemilik } }).then(admin => {
        const s1 = ok.uuid_barang,
          s2 = ok.barang,
          s3 = 1,
          s4 = ok.harga,
          s6 = ok.foto,
          s7 = ok.harga;
        s8 = admin.nama;
        koneksi.findOne({ where: { uuid: req.decoded.email } }).then(user => {
          const s5 = user.uuid;
          if (ok.uuid_pemilik == user.uuid) {
            req.session.message = {
              type: 'danger',
              intro: 'ERROR !',
              message: 'Anda tidak bisa membeli barang sendiri'
            }
            res.redirect("/user/toko")
          } else {
            keranjang
              .findOne({ where: { uuid_barang: ok.uuid_barang } })
              .then(cek_keranjang => {
                if (cek_keranjang) {
                  if (ok.stok == 0) {
                    req.session.message = {
                      type: 'danger',
                      intro: 'ERROR !',
                      message: 'Barang Sudah Habis'
                    }
                    res.redirect("/user/toko")
                  } else {
                    var data;
                    var data = {
                      uuid_barang: s1,
                      nama_barang: s2,
                      total_barang: cek_keranjang.total_barang + 1,
                      harga_total:
                        (cek_keranjang.total_barang + 1) * cek_keranjang.harga,
                      nama_pembeli: s5,
                      gambar: s6,
                      harga: s7,
                      admin: s8
                    };
                    keranjang
                      .update(data, {
                        where: { id_cart: cek_keranjang.id_cart }
                      })
                      .then(done => {
                        res.redirect("/user/toko");
                      });
                  }
                } else {
                  var data = {
                    uuid_barang: s1,
                    nama_barang: s2,
                    total_barang: s3,
                    harga_total: s4,
                    nama_pembeli: s5,
                    gambar: s6,
                    harga: s7,
                    admin: s8
                  };
                  keranjang.create(data).then(done => {                    
                    res.redirect("/user/toko");
                  });
                }
              })
              .catch(cek_keranjang1 => {
                req.session.message = {
                  type: 'danger',
                  intro: 'ERROR !',
                  message: 'Terjadi Kesalahan'
                }
                res.redirect("/user/toko");
              });
          }
        });
      });
    });
  };
    
exports.hapus_keranjang = (req, res) => {
    var pemilik = req.decoded.email;
    var id_kat = req.params.id;
    koneksi.findOne({ where: { uuid: pemilik } }).then(user => {
      keranjang.findOne({ where: { id_cart: id_kat } }).then(hps_keranjang => {
        if (hps_keranjang) {
          keranjang.destroy({ where: { id_cart: id_kat } }).then(done => {
            res.redirect("/user/keranjang");
          });
        } else {
          req.session.message = {
            type: 'danger',
            intro: 'ERROR !',
            message: 'Tidak ada barang'
          }
          res.redirect("/user/keranjang");
        }
      });
    });
};  

exports.love=(req,res)=>{
  var productId = req.params._id;
  koneksi.findOne({where:{uuid:req.decoded.email}}).then(wong=>{
    barang_.findOne({ where: { uuid_barang: productId } }).then(ok => {         
      love.findOne({where:{uuid_barang : ok.uuid_barang , id_user:wong.uuid }}).then(insert=>{                    
        if(insert){   
          console.log("ada");       
          req.session.message = {
            type: 'warning',
            intro: 'Warning ,',
            message: 'sudah terdaftar di favorit'
          }
          res.redirect("/user/toko");
        }else{     
          if(wong.uuid == ok.uuid_pemilik){
            req.session.message = {
              type: 'danger',
              intro: 'ERROR !',
              message: 'Anda Tidak boleh Menambahkan Barang anda'
            }
            res.redirect("/user/toko");
          }else{          
            var data={
              uuid_barang : ok.uuid_barang,
              nama_barang : ok.barang,
              harga_barang: ok.harga,
              id_user     : wong.uuid,
              gambar      : ok.foto
            }
            love.create(data).then(tambahLove=>{            
              res.redirect("/user/toko");
            })      
          }
        }
      })
    })
  })
}

exports.loves=(req,res)=>{
  koneksi.findOne({ where: { uuid: req.decoded.email } }).then(ok => {    
      var id = ok.uuid;              
      var sql = "SELECT * FROM user_favorits WHERE id_user = ?";
      ss.db.query(sql, id , (err, oks) => {                                  
            res.render("keranjang",{ oyi: oks ,total:oke[0],data:oks[0]});        
    });
  });
}