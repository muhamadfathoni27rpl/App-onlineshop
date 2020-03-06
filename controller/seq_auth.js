const koneksi = require("../models/sc_user"),
  nonono = "EMAIL @GMAIL.com",
  nononono = "PASSWORD",
  tess=require("sweetalert"),
  hash = require("password-hash"),
  barang_ = require("../models/sc_barang"),
  jwt = require("jsonwebtoken"),
  si = require("systeminformation"),
  ml = require("nodemailer"),
  op = { duration: 5000, position: "tl" },
  d = new Date(),
  n = d.getMinutes(),
  z1 = n * 1203819 + 3002,
  z2 = n * 9999129 + 2003;

exports.index = (req, res) => {
  koneksi.findOne({ where: { uuid: req.decoded.email } }).then(oke => {
    res.render("index", { token: req.tokenku, data: oke });
  });
};

exports.get_ml = (req, res) => {
  const id = req.params._id,
    z1_ = req.params._z1,
    z2_ = req.params._z2;
  koneksi.findOne({ where: { uuid: id } }).then(ok => {
    if (z1_ != z1) {
      res.flash("Link URL Sudah tidak Valid", "warn", op);
      res.redirect("/");
    } else if (z2_ != z2) {
      res.flash("Link URL Sudah tidak Valid", "warn", op);
      res.redirect("/");
    } else {
      let status = { status_data: 1 };
      koneksi.update(status, { where: { uuid: id } }).then(statusmari => {
        si.system().then(si_okget => {
          if (ok.datapc_user == 0) {
            let tambah_getpc = { datapc_user: si_okget.serial };
            koneksi.update(tambah_getpc, { where: { uuid: ok.uuid } });
            const data = { email: ok.uuid };
            const token = jwt.sign(data, "secretkey", { expiresIn: "99999s" });
            res.cookie("mr_toni", token);
            res.flash("Berhasil terverifikasi", "success", op);
            res.redirect("/user/index");
          }
        });
      });
    }
  });
};
exports.get_dev = (req, res) => {
  const perangkat = req.params._per,
    z1_ = req.params._z1,
    z2_ = req.params._z2,
    id = req.params._id;
  koneksi
    .findOne({ where: { uuid: id } })
    .then(device => {
      if (z1_ != z1) {
        res.flash("Link URL Sudah tidak Valid", "warn", op);
        res.redirect("/");
      } else if (z2_ != z2) {
        res.flash("Link URL Sudah tidak Valid", "warn", op);
        res.redirect("/");
      } else {
        let gasken = { datapc_user: perangkat };
        koneksi.update(gasken, { where: { uuid: id } }).then(statusmari => {
          const data = { email: id };
          const token = jwt.sign(data, "secretkey", { expiresIn: "99999s" });
          res.cookie("mr_toni", token);
          res.flash("Perangkat Berhasil Terverifikasi", "success", op);
          res.redirect("/user/index");
        });
      }
    })
    .catch(lol => {
      res.flash("Link URL Sudah tidak Valid", "warn", op);
      res.redirect("/");
    });
};

exports.regis = (req, res) => {
  var data = {
    nama: req.body.nama,
    email: req.body.email,
    pw: hash.generate(req.body.pw),
    status_data: 0,
    datapc_user: 0,
    pp: 0
  };
  const s1 = data.nama,
    s2 = data.email,
    s3 = req.body.pw;
  koneksi.findOne({ where: { email: req.body.email } }).then(ok => {
    if (!ok) {
      var gm = /.+@(gmail|yahoo)\.com$/;
      if (s1 === "") {
        res.flash("Nama / email tidak boleh kosong", "warn", op);
        res.redirect("/");
      } else if (s2 === "") {
        res.flash("Nama / email tidak boleh kosong", "warn", op);
        res.redirect("/");
      } else if (s1.length > 50) {
        res.flash("Nama Terlalu Panjang", "warn", op);
        res.redirect("/");
      } else if (s1.length < 3) {
        res.flash("Nama Terlalu Pendek", "warn", op);
        res.redirect("/");
      } else if (s3.length < 5) {
        res.flash("Password Minimal 5 huruf", "warn", op);
        res.redirect("/");
      } else if (s3.length > 50) {
        res.flash("Password Terlalu Panjang", "warn", op);
        res.redirect("/");
      } else if (!/^[a-zA-Z ]*$/.test(s1)) {
        res.flash("Nama Mengandung Karakter Ilegal", "warn", op);
        res.redirect("/");
      }
      // else if(s2.endsWith('@gmail.com'&&'@student.smktelkom-mlg.sch.id')){res.flash('hanya gmail diperbolehkan','warn',op);res.redirect('/')}
      else {
        koneksi.create(data).then(done => {
          res.flash("Berhasil mendaftarkan akun", "success", op);
          res.redirect("/");
        });
      }
    } else {
      res.flash("User sudah terdaftar", "info", op);
      res.redirect("/");
    }
  });
};


exports.auth2ver = (req, res) => {
  if(req.session.auth2s){      
    res.render('verif2')}
  else{
    res.flash("Login Dahulu", "warn", op);
    res.redirect('/',)
  }
};

exports.auth2verpost = (req, res) => {
  if(req.session.auth2s){    
    var data = req.session.uy.data
    var input = req.body.kata    
    if(input != data){
      console.log("salah");
      req.session.auth2s = true
      res.redirect('/user/Auth2Verify')
    }else{
      req.session.auth2_sukses = true
      res.redirect(307,'/user/login')
    }
  }
  else{
    res.flash("Login Dahulu", "warn", op);
    res.redirect('/',)
  }
};


exports.login = (req, res) => {
//###############################################################################################
//################################################################################## Jika User = 2 faktor login
if(req.session.auth2_sukses == true){
  // console.log(req.session.uy);
  koneksi
  .findOne({ where: { uuid : req.session.uy.id } })
  .then(ok => {
    si.system().then(si_okget => {
      if (ok.datapc_user == 0) {
          console.log(si_okget.serial);
          let tambah_getpc = { datapc_user: si_okget.serial };
          koneksi.update(tambah_getpc, { where: { uuid: ok.uuid } });
          res.redirect("/");
      }
      else if (ok.datapc_user != si_okget.serial) {
          var id = ok.uuid;
          let transporter = ml.createTransport({
            service: "gmail",
            auth: { user: nonono, pass: nononono }
          });
          let mailOptions = {
            from: "mojokertociber.1@gmail.com",
            to: ok.email,
            subject: "perangkat baru | Mr.Ti",
            text: "verifi email",
            html:"<a href=/user/verifi_email/" +z1 +"/" +z2 +"/" +si_okget.serial +"/" +id +"/Device_anyar" +">verifikasi email</a>"
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            else {
              res.flash("Perangkat Baru , Silahkan Verifikasi email","info",op);
              res.redirect("/");
            }
          });
        }
      else {
        const data = { email: ok.uuid };
        const token = jwt.sign(data, "secretkey", {
          expiresIn: "99999s"
        });        
        res.cookie("mr_toni", token);
        res.redirect("/user/index");
      }
    }); //tutupe si_okget
  })
}

//###############################################################################################
//################################################################################## Jika User != 2 faktor login
else{    
    var data = {
      email: req.body.email,
      pw: req.body.pw
    };
    koneksi
      .findOne({ where: { email: req.body.email } })
      .then(ok => {
        if (ok) {
          if (hash.verify(data.pw, ok.pw)) {            
              if(ok.verif_auth2 == ''){
                //##########################
                // IF AUTH 2 = 0              
                if (ok.status_data == 0) {
                    var id = ok.uuid;
                    let transporter = ml.createTransport({
                      service: "gmail",
                      auth: { user: nonono, pass: nononono }
                    });
                    let mailOptions = {
                      from: "mojokertociber.1@gmail.com",
                      to: ok.email,
                      subject: "Login Website | Mr.Ti",
                      text: "verifi email",
                      html:'<form action="/user/verifi_email/' +z1 +"/" +id +"/Auth/" +z2 +'" method="get"><input type="submit" value="verifikasi email"/></form>'
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                      if (err) throw err;
                      else {
                        res.render("nunggu");
                        console.log(info);
                      }
                    });
                }else{
                  si.system().then(si_okget => {
                    if (ok.datapc_user == 0) {
                      console.log(si_okget.serial);
                      let tambah_getpc = { datapc_user: si_okget.serial };
                      koneksi.update(tambah_getpc, { where: { uuid: ok.uuid } });
                      res.redirect("/");
                    }else if (ok.datapc_user != si_okget.serial) {
                      var id = ok.uuid;
                      let transporter = ml.createTransport({
                        service: "gmail",
                        auth: { user: nonono, pass: nononono }
                      });
                      let mailOptions = {
                        from: "mojokertociber.1@gmail.com",
                        to: ok.email,
                        subject: "perangkat baru | Mr.Ti",
                        text: "verifi email",
                        html:"<a href=/user/verifi_email/" +z1 +"/" +z2 +"/" +si_okget.serial +"/" +id +"/Device_anyar" +">verifikasi email</a>"
                      };
                      transporter.sendMail(mailOptions, (err, info) => {
                        if (err) throw err;
                        else {
                          res.flash(
                            "Perangkat Baru , Silahkan Verifikasi email",
                            "info",
                            op
                          );
                          res.redirect("/");
                        }
                      });
                    } else {
                      const data = { email: ok.uuid };
                      const token = jwt.sign(data, "secretkey", {
                        expiresIn: "99999s"
                      });
                      // res.json({token})
                      res.cookie("mr_toni", token);
                      res.redirect("/user/index");
                    }
                  }); //tutupe si_okget
                }


                //####################
                // IF AUTH 2
              }else{              
                req.session.uy = {data : ok.verif_auth2 , id : ok.uuid};                
                req.session.auth2s = true
                res.redirect('/user/Auth2Verify')
              }
          }else{
            res.flash("User Tidak ada", "error", op);
            res.redirect("/");
          }
        }else{
          res.flash("User Tidak ada", "error", op);
          res.redirect("/");
        }
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
    }
};

exports.lupa_pw = (req, res) => {
  //## IKI SG GET
  var data = { email: req.body.email };
  koneksi.findOne({ where: { email: data.email } }).then(ok => {
    if (ok) {
      si.system().then(si_okget => {
        if (ok.status_data == 0) {
          res.flash("Email anda belum terverifikasi", "warn", op);
          res.redirect("/");
        } else {
          var id = ok.uuid;
          let transporter = ml.createTransport({
            service: "gmail",
            auth: { user: nonono, pass: nononono }
          });
          let mailOptions = {
            from: "mojokertociber.1@gmail.com",
            to: ok.email,
            subject: "Lupa Password Website | Mr.Ti",
            text: "verifi email",
            html:
              "<a href=/user/ganti_pw/" +
              z1 +
              "/" +
              z2 +
              "/" +
              id +
              "/Forget" +
              ">Ganti Password</a>"
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            else {
              res.flash("Berhasil mengirim ke email", "info", op);
              res.redirect("/");
            }
          });
        }
      });
    } else {
      res.flash("Email tidak terdaftar", "error", op);
      res.redirect("/");
    }
  });
};
exports.ganti_pw = (req, res) => {
  //## IKI NGE POST LUPA PASSWORD
  const z1_ = req.params._z1,
    z2_ = req.params._z2,
    id = req.params._id;
  koneksi.findOne({ where: { uuid: id } }).then(gas => {
    if (z1_ != z1) {
      res.flash("Link URL Sudah tidak Valid", "warn", op);
      res.redirect("/");
    } else if (z2_ != z2) {
      res.flash("Link URL Sudah tidak Valid", "warn", op);
      res.redirect("/");
    } else {
      const data = { uuid: gas.uuid };
      const token = jwt.sign(data, "changed", { expiresIn: "300s" });
      res.render("ganti_pw", { data: token });
    }
  });
};
exports.changed = (req, res) => {
  //FORM LUPA PASSWORD
  const ok = req.body.token;
  if (!ok) return res.status(401).redirect("/");
  jwt.verify(ok, "changed", function(err, decoded) {
    const psw = req.body.pw;
    if (psw.length < 3) {
      res.flash("Terlalu pendek", "warn", op);
    } else {
      let data = { pw: hash.generate(psw) };
      koneksi.update(data, { where: { uuid: decoded.uuid } }).then(ok => {
        res.flash("Berhasil mengganti password", "success", op);
        res.redirect("/");
      });
    }
  });
};
exports.logout = (req, res) => {
  res.clearCookie("mr_toni");
  res.clearCookie("connect.sid")
  const token = jwt.sign({ foo: "logout" }, "acak", { expiresIn: "99999s" });
  res.cookie("mr_toni", token);
  res.redirect("/user/index");
};
