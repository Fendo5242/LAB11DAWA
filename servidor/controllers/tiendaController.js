const Tienda = require("../models/Tienda");

exports.crearTienda = async (req, res) => {
    try {
        const tienda = new Tienda(req.body);

        await tienda.save();
        res.send(tienda);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear la tienda');
    }
}

exports.obtenerTiendas = async (req, res) => {
    try {
        const tiendas = await Tienda.find();
        res.json(tiendas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener las tiendas');
    }
}

exports.actualizarTienda = async (req, res) => {
    try {
        const { _id, lat, lng, title, info } = new Tienda(req.body);
        let tienda = await Tienda.findById(req.params.id);

        if (!tienda) {
            res.status(404).json({ msg: 'No existe la tienda' });
        }

        tienda._id = _id;
        tienda.lat = lat;
        tienda.lng = lng;
        tienda.title = title;
        tienda.info = info;

        tienda = await Tienda.findOneAndUpdate({ _id: req.params.id }, tienda, { new: true });
        res.json(tienda);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la tienda');
    }
}

exports.verTienda = async (req, res) => {
    try {
        let tienda = await Tienda.findById(req.params.id);

        if (!tienda) {
            res.status(404).json({ msg: 'No existe la tienda' });
        }

        res.json(tienda);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener la tienda');
    }
}

exports.eliminarTienda = async (req, res) => {
    try {
        let tienda = await Tienda.findById(req.params.id);

        if (!tienda) {
            res.status(404).json({ msg: 'No existe la tienda' });
        }

        tienda = await Tienda.findOneAndRemove(req.params.id);

        res.json({ msg: 'La tienda con ID ' + req.params.id + ' se ha eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la tienda');
    }
}