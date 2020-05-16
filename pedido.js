let mongoose = require('mongoose');

//Schema Pedido
let pedidoSchema = mongoose.Schema({
    utente:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        required:true
    },
    notas:{
        type:String,
        required:false
    },
    resultado:{
        type:String,
        required:true
    }  
});   

let Pedido = module.exports = mongoose.model('Pedido',pedidoSchema);