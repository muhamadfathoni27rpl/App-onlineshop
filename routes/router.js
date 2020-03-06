const seq_auth = require("../controller/seq_auth"),
  seq_crud = require("../controller/seq_barang"),
  seq_profil = require("../controller/seq_profil"),
  seq_cart = require("../controller/seq_keranjang"),
  seq_bayar = require("../controller/seq_bayar"),
  seq_kirim = require("../controller/seq_pengiriman"),
  dir = "./public/uploads",
  path = require("path"),
  fs = require("fs"),
  jwt = require("jsonwebtoken"),
  multer = require("multer"),
  upload = multer({
    storage: multer.diskStorage({
      destination: function(req, file, callback) {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          callback(null, "./public/uploads");
      },
      filename: function( req, file , callback ) {
        callback(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      }
    }),

    fileFilter: function(req, file, callback) {
      var ext = path.extname(file.originalname);
      if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
        return callback(res.redirect("/user/profil", false));
      }
      callback(null, true);
    }
  }),
  rateLimit = require("express-rate-limit");

function jwt_token(req, res, next) {
    const ok = req.cookies.mr_toni;  
    if (!ok) return res.status(401).redirect("/");
    jwt.verify(ok, "secretkey", (err, decoded) => {
      if(err){      
        res.redirect('/')
      }else{
        req.decoded = decoded
        req.tokenku = ok
        next()
      }
    });
}

module.exports = app => {
  // ################################## GET
  // ######################################
  // == profile ==  
  app.get("/user/logout",                                        seq_auth.logout);
  app.get("/user/Auth2Verify",                                   seq_auth.auth2ver)
  app.get("/user/ganti_pw/:_z1/:_z2/:_id/Forget",                seq_auth.ganti_pw);
  app.get("/user/verifi_email/:_z1/:_id/Auth/:_z2",              seq_auth.get_ml);
  app.get("/user/verifi_email/:_z1/:_z2/:_per/:_id/Device_anyar",seq_auth.get_dev);
  app.get("/",                            (req,res)=>{res.render('login')})
  app.get("/user/index",                  jwt_token,seq_auth.index);  
  app.get("/user/profil",                 jwt_token,seq_profil.profil);      
  app.get("/user/saldo",                  jwt_token,seq_profil.saldo)
  // == barang ==  
  app.get("/user/get_barang",             jwt_token,seq_crud.get_barang);
  app.get("/user/toko",                   jwt_token,seq_crud.toko);
  // == Keranjang ==
  app.get("/user/keranjang",              jwt_token,seq_cart.keranjang);
  app.get("/user/love/:_id",              jwt_token,seq_cart.love);
  app.get("/user/keranjang_tambah/:_id",  jwt_token,seq_cart.keranjang_tambah)
  app.get("/user/hapus_keranjang/:id",    jwt_token,seq_cart.hapus_keranjang)  
  // == Pembayaran ==
  app.get("/user/konfir/:_id",            jwt_token,seq_bayar.konfir)  
  app.get("/user/pembayaran",             jwt_token,seq_bayar.bayar)
  // == Status Pengiriman ==
  app.get("/user/status",                 jwt_token,seq_kirim.status)
  

  // ################################# POST
  // ######################################
  app.post("/user/Auth2Verified",         seq_auth.auth2verpost)
  app.post("/user/lupa_password",         seq_auth.lupa_pw);           
  app.post("/user/lupa_password/changed", seq_auth.changed);
  app.post("/user/regis",                 seq_auth.regis);
  app.post("/user/setfactor",             jwt_token,seq_profil.setfactor)
  app.post("/user/detfactor",             jwt_token,seq_profil.detfactor)
  app.post("/user/pwAnyar",               jwt_token,seq_profil.pwAnyar);
  app.post("/user/profil_ubah",           jwt_token,seq_profil.profil_ubah);  
  app.post("/user/gambar",                jwt_token,seq_profil.gambar,upload.single("gambar"));
  app.post("/user/login",rateLimit({windowMs: 5 * 60 * 1000,max: 20,message:'Anda sudah melebihi batas login'}),seq_auth.login);



  app.post("/user/pengiriman",            jwt_token,seq_bayar.pengiriman)
  app.post("/user/chekot/:_id",           jwt_token, seq_bayar.chekot);  
  app.post('/user/hapus/:id',             jwt_token,seq_crud.hapus)
  app.post("/user/barang",                jwt_token,upload.single("gbr_brg"),seq_crud.barang);
  app.post("/user/update_barang",         jwt_token,upload.single("gmbar"),seq_crud.update_barang);  
};
