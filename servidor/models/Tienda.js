const mongoose = require('mongoose');

const TiendaSchema = mongoose.Schema({
    lat: {
        type: Number,
        require: true
    },
    lng: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    info: {
        type: String,
        require: true    
    }
});

module.exports = mongoose.model('Tienda', TiendaSchema)