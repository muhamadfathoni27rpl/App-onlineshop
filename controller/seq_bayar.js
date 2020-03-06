const koneksi = require("../models/sc_user"),
  nonono = "EMAIL @ gmail.com",
  nononono = "PASSWORD",
  barang_ = require("../models/sc_barang"),
  ss = require("../models/database.js"),
  ml = require("nodemailer"),
  kategori_ = require("../models/sc_kategori"),
  pesan_ = require("../models/sc_pesanan"),
  keranjang = require("../models/sc_keranjang");

exports.konfir = (req, res) => {
  const idPesan = req.params._id;
  koneksi.findOne({ where: { uuid: req.decoded.email } }).then(wong => {    
    pesan_
      .findOne({ where: { id_pembeli: wong.uuid, id_pesan: idPesan } })
      .then(pesanan => {
        console.log(pesanan.total);
        if (wong.saldo < pesanan.total) {
          console.log("onok");
          
        }
        // else {
        //   req.session.message = {
        //     type: "danger",
        //     intro: "ERROR !",
        //     message: "Saldo Tidak Mencukupi , Silahkan TOP UP"
        //   };
        //   res.redirect("/user/pembayaran");
        // }
      });
  });
};

exports.bayar = (req, res) => {
  koneksi.findOne({ where: { uuid: req.decoded.email } }).then(wong => {
    pesan_
      .findAll({ where: { id_pembeli: wong.uuid, status: 0 } })
      .then(tampil => {
        if (tampil.length > 0) {
          let data = [];
          tampil.map((item, i) => {
            data.push({
              barang: JSON.parse(item.barang)
            });
            if (data.length === tampil.length) {
              return res.render("cekot", { data: data, oyi: tampil });
            }
          });
        } else {
          res.render("cekot", { data: "tidak ada", oyi: "bangsat" });
        }
        // const data = JSON.parse(JSON.parse(tampil.barang))
        // data.map((item,is)=>{
        //   if(tampil.length > 0){
        //       return res.render("cekot");
        //     }else{
        //       return res.render("cekot",{data: "tidak ada", oyi: "bangsat"})
        //     }
        // })
      });
  });
};

exports.pengiriman = (req, res) => {
  var email = req.body.email,
    nmd = req.body.nmDepan,
    nmb = req.body.nmBelakang,
    alamat = req.body.alamat,
    kecamatan = req.body.kecamatan,
    kota = req.body.kota,
    kodepos = req.body.kodepos,
    hp = req.body.hp,
    id_pembeli = req.body.id_pembeli,
    id_pesans = req.body.id_pesan,
    total = req.body.total;

  pesan_.findOne({ where: { id_pesan: id_pesans } }).then(selek => {
    const data = JSON.parse(JSON.parse(selek.barang));
    data.map((item, is) => {
      barang_.findAll({ where: { uuid_barang: item.idBarang } }).then(barangs => {
        //##### barangs
          for (var i = 0; i < barangs.length; i++) {
            var brg = { stok: barangs[i].stok - item.totalBarang };

            koneksi.findAll({ where: { uuid: barangs[i].uuid_pemilik } }).then(mlAdmin => {
              //####### mlAdmin 
              console.log(mlAdmin);
                var pemilikInfo = mlAdmin[0].email;
                var info ="Nama Barang : [ " + item.namaBarang + " ] pemilik : "+mlAdmin[0].nama+ 
                          " harga : Rp." + item.hargaBarang +
                          " Total Barang dipesan : "+item.totalBarang
                  let transporter = ml.createTransport({
                            service: "gmail",
                            auth: { user: nonono, pass: nononono }
                          });
                  let mailOptions = {
                            from: "mojokertociber.1@gmail.com",
                            to: pemilikInfo,
                            subject: "Pesanan User | Mr.Ti",
                            text:'PESANAN BARANG',
                            html: '<table border="1" style=" font-family: sans-serif;color: #444;border-collapse: collapse;border: 1px solid #f2f5f7;">'+
                                  '<thead>'+
                                  '<tr>'+
                                  '<th> Informasi Pesanan </th>'+
                                  '<th>Nama D.Penerima</th>'+
                                  '<th>Nama B.Penerima</th>'+
                                  '<th>Alamat</th>'+
                                  '<th>Kecamatan</th>'+
                                  '<th>Kab/Kota</th>'+
                                  '<th>KodePos</th>'+
                                  '<th>Nomor Hp Pembeli</th>'+
                                  '</tr>'+
                                  '</thead>'+
                                  '<tbody>'+
                                  '<th>'+info+'</th>'+
                                  '<th>'+nmd+'</th>'+
                                  '<th>'+nmb+'</th>'+
                                  '<th>'+alamat+'</th>'+
                                  '<th>'+kecamatan+'</th>'+
                                  '<th>'+kecamatan+'</th>'+
                                  '<th>'+kodepos+'</th>'+
                                  '<th>'+hp+'</th>'+
                                  '</tbody>'+
                                  '</table>'
                          };
                  transporter.sendMail(mailOptions,(err, info) => {
                              if (err) throw err;
                              else {
                                console.log(info);
                            //     barang_.update(brg, { where: { uuid_barang: item.idBarang } }).then(apdet => {
                            //       var datae = { status: 1 };
                            //       pesan_.update(datae, { where: { id_pesan: id_pesans } }).then(updateStatus => {
                            //           koneksi.findOne({ where: { uuid: id_pembeli } }).then(updateSaldo => {
                            //               var dataSaldo = { saldo: updateSaldo.saldo - total};
                            //               koneksi.update(dataSaldo, {where: { uuid: updateSaldo.uuid }})
                            //                 .then(doneSaldo => {
                                              
                            //             });
                            //         });
                            //     });
                            // });
                              }
                            }
                          );
                        });
          }            
        });
    });
    res.redirect("/user/pembayaran");
  });
};

exports.chekot = (req, res) => {
  const jom = req.body.jom;
  const id = req.params._id;
  const admin = req.body.admin;
  koneksi.findOne({ where: { uuid: req.decoded.email } }).then(wong => {
    var nama = wong.nama;
    keranjang.findAll({ where: { nama_pembeli: id } }).then(pembeli => {
      pesan_
        .findOne({ where: { id_pembeli: wong.uuid, status: 0 } })
        .then(cekPesan => {
          if (cekPesan) {
            req.session.message = {
              type: "warning",
              intro: "Warning ,",
              message: "Anda Harus melakukan pembayaran pada pesanan sebelumnya"
            };
            res.redirect("/user/pembayaran");
          } else {
            var s_barang = [];
            for (var i = 0; i < pembeli.length; i++) {
              s_barang.push({
                idBarang: pembeli[i].uuid_barang,
                namaBarang: pembeli[i].nama_barang,
                totalBarang: pembeli[i].total_barang,
                hargaBarang: pembeli[i].harga_total
              });
              if (s_barang.length == pembeli.length) {
                var data = {
                  pemilik: admin,
                  pembeli: nama,
                  id_pembeli: wong.uuid,
                  barang: JSON.stringify(s_barang),
                  total: jom,
                  status_pembayaran: 0
                };
                pesan_.create(data).then(tambahPesan => {
                  keranjang
                    .destroy({ where: { nama_pembeli: wong.uuid } })
                    .then(hapusKeranjang => {
                      res.redirect("/user/pembayaran");
                    });
                });
              }
            }
          }
        });
    });
  });
};
