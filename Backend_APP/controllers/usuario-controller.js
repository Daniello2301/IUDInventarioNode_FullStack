const Usuario = require('../models/Usuario');

const  usuarioValidator  = require('../helpers/usaurio-validator');


// metodo listar todo
const getAll = async( req, res ) =>{

    try 
    {
        const response = await Usuario.find();

        console.log("GET/usuarios");
        res.status(200).send(response);

    } catch (err) {
        console.log("Error ", err)
        res.status(404).json({msj: error.message}).send("Ocurrió un error")
    }
}

// Método litar por Id
const getById = async(req, res) => {
    try 
    {
        const { id }= req.params;

        const response = await Usuario.findById(id);

        console.log("GET/usuario/id")
        res.status(200).json(response);

    } catch (error) {
        
        console.log("Error, ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }

};
// CRUD
// Create Read Update Delete

const getByActiveUser = async( req, res ) => {
    try 
    {
        const query = {estado: 'Activo'}
        let response = await Usuario.find(query);
        
        res.status(200).json(response);

    } catch (error) {
        console.log("Error", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
}


// Metodo crear
const create = async(req, res) => {

    try 
    {
       console.log("POST/usuarios")
       console.log(req.body)

       /* **** Validaciones ****** */
    
        const errors = usuarioValidator(req);

        if(errors.length > 0){
            return res.status(500).send(errors);
        }
    

       const nombre = req.body.nombre;
       const email = req.body.email;
       const estado = req.body.estado;

       let usuario = await Usuario.findOne({email});
       if(usuario) return res.status(406).json({mjs: "El email ya existe"});

       const data = {
         nombre, email, estado
       }

       usuario = new Usuario(data);

       usuario.save();

       res.status(201).jsonp(usuario);

    } catch (error) {
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
};


//Metodo actualizar Usaurio
const update = async(req, res) => {
     
    try 
    {

        const errors = usuarioValidator(req);

        if(errors.length > 0){
            return res.status(500).send(errors);
        }

        const id = req.params.id;

        let usuario = await Usuario.findById( {_id : id });
        if(!usuario) return res.status(404).json({mjs: "El usuario no se econtró"});


        const { nombre, email, estado } = req.body;
        
        const usuarioExiste = await Usuario.findOne({ email: email,  _id: {$ne: id}});
        if(usuarioExiste){
            return res.status(500).json({mjs: "El email del usuario ya existe"})
        }

        usuario.nombre = nombre;
        usuario.email = email;
        usuario.estado = estado;

        await usuario.save();

        console.log(usuario)
        res.status(202).json(usuario)

    } catch (error) {
        console.log("Error ", error)
        res.status(500).json({msj: error}).send("Ocurrió un error", error.message)
    }
}

// Método borrar por id
const deleteById = async(req, res) => {

    try {
        console.log("DELETE/usuario/", req.params.id);

        const id = req.params.id
        const usuarioExist = await Usuario.findByIdAndDelete(id)
        if(!usuarioExist){
            return res.status(404).json({mjs: "El usuario no se econtró"})
        }

        res.status(200).json(usuarioExist);
    } catch (error) {
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
}


module.exports = {getAll, create, getById, update, deleteById, getByActiveUser}