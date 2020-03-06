const koneksi = require("../models/sc_user"),
  hash = require("password-hash"),
  love = require("../models/sc_favor"),
  op = {duration:5000,position:"tl"}

exports.profil=(req,res)=>{                                 // GET PROFIL               
  koneksi.findOne({where:{uuid:req.decoded.email}}).then(ok=>{
    love.findAll({where:{id_user:ok.uuid}}).then(love=>{
      // console.log(love);
      res.render('profil',{data:ok,love:love})
    })
  })  
}          

exports.setfactor=(req,res)=>{
  koneksi.findOne({where:{uuid:req.decoded.email}}).then(ok=>{
      var input = req.body.kata
      var key = {verif_auth2 : input}
      if(input.length > 30){
        console.log("Maksimal 30 huruf");
      }else{
        koneksi.update(key,{where:{uuid : ok.uuid}}).then(done=>{
          console.log("sukses set key faktor");
          res.redirect('/user/profil')
        })
      }
  })  
}

exports.detfactor=(req,res)=>{
  koneksi.findOne({where:{uuid:req.decoded.email}}).then(ok=>{            
        var key = {verif_auth2 : ''}
        koneksi.update(key,{where:{uuid : ok.uuid}}).then(done=>{
          console.log("sukses Hapus key faktor");
          res.redirect('/user/profil')
        })
  })  
}

exports.gambar =(req,res)=>{             
      koneksi.findOne({where:{uuid:req.decoded.email}})
      .then(ok=>{
        if(req.file){
          var gmb = {pp :req.file.filename}                    
          koneksi.update(gmb,{where:{uuid:ok.uuid}})
          .then(done_aplod=>{            
            req.session.message = {
              type: 'success',
              intro: 'Sukses',
              message: 'berhasil memperbarui foto profile'
            }
            res.redirect('/user/profil')
          })
        }else{
          console.log("gk");
        }
      })      
    }

exports.profil_ubah=(req,res)=>{                            //POST UBAH PROFIL
        koneksi.findOne({where:{uuid:req.decoded.email}})
        .then(ok=>{        
          var data={
            nama : req.body.nama,
            hp : req.body.hp,
            alamat : req.body.alamat,
            web:req.body.web
          }
          console.log(data);
          if(data.nama == null){res.flash('Tidak Boleh Kosong','error',op);res.redirect('/user/profil')}
          else if(data.nama == ""){res.flash('Tidak Boleh Kosong','error',op);res.redirect('/user/profil')}
          else if(data.nama == " "){res.flash('Tidak Boleh Kosong','error',op);res.redirect('/user/profil')}
          else if(!/^[a-zA-Z ]*$/.test(data.nama)){res.flash('Nama Mengandung Karakter Ilegal','warn',op);res.redirect('/user/profil')} 
          else if(data.nama.length > 50){res.flash('Nama Terlalu Panjang','warn',op);res.redirect('/user/profil')}
          else if(data.nama.length < 3){res.flash('Nama Terlalu Pendek','warn',op);res.redirect('/user/profil')} 
          else{
            koneksi.update(data,{where:{uuid:ok.uuid}})
            .then(done=>{
              console.log(done);
              req.session.message = {
                type: 'success',
                intro: 'Sukses',
                message: 'berhasil memperbarui profile'
              }
              res.redirect('/user/profil')
            })
          }
        })      
}

exports.pwAnyar=(req,res)=>{
  koneksi.findOne({where:{uuid:req.decoded.email}}).then(wong=>{  
    var data={
      pw : hash.generate(req.body.password1)
    }
    if(req.body.password1 != req.body.password2){
      req.session.message = {
        type: 'danger',
        intro: 'ERROR !',
        message: 'Password Konfirmasi Tidak sama'
      }
      res.redirect('/user/profil')
    }
    else if(req.body.password1 == '' || req.body.password2 == '' || req.body.password1 == null || req.body.password1.length < 6){
      req.session.message = {
        type: 'danger',
        intro: 'ERROR !',
        message: 'Masukan data dengar benar'
      }
      res.redirect('/user/profil')
    }
    else{
      koneksi.update(data,{where:{uuid:wong.uuid}}).then(done=>{
        req.session.message = {
          type: 'success',
          intro: 'Sukses ',
          message: 'Password berhasil diubah'
        }
        res.redirect('/user/profil')
      })      
    }
  })
}

exports.saldo=(req,res)=>{
  koneksi.findOne({where:{uuid:req.decoded.email}}).then(wong=>{  
    // console.log(wong);
    res.render('saldo',{data:wong.saldo})
  })
}