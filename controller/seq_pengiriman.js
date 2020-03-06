const koneksi = require("../models/sc_user"),
  barang_ = require("../models/sc_barang"),
  ss = require("../models/database.js"),ml = require('nodemailer'), 
  kategori_ = require("../models/sc_kategori"),  
  pesan_ = require("../models/sc_pesanan"),
  keranjang = require("../models/sc_keranjang")

  exports.status = (req, res) => {
    koneksi.findOne({where:{uuid:req.decoded.email}}).then(wong=>{    
        pesan_.findAll({where:{id_pembeli: wong.uuid,status : 1}}).then(tampil=>{      
          if(tampil > 0){
            let data = []            
            tampil.map((item,i) => {
                data.push({
                  barang: JSON.parse(item.barang)
                })
                    if(data.length === tampil.length){                                                                                
                      console.log(data);                        
                        return res.render("status",{data : data, base : tampil[0].kirim}); 
                    }
              })
          }
          else{
            return res.render("status",{data : ''}); 
          }          
      })
    })

  };