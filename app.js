const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
  });

//Añadir usuario

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
      edad: req.body.edad,
      lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    console.log(`El usuario ${nuevoUsuario.nombre} ha sido añadido`)
    res.redirect('/usuarios');
  });

//Para acceder al URL personalizada.

app.get("/usuarios/:nombre", (req, res) =>{
    const nombre =req.params.nombre;
    const usuario = usuarios.find(u => u.nombre === nombre)

    if (!usuarios){
        res.status(404).json("Usuario no encontrado")
    } else {
        res.json(usuario)
    }
})

//Editar Usuario (NO TERMINADO)

// // app.put('/usuarios/:nombre', (req, res) => {
// //     const nombre =req.params.nombre
// //     const usuario = usuarios.findIndex(u => u.nombre === nombre)

// //     const nuevoUsuario = {
// //       id: usuarios.length + 1,
// //       nombre: req.body.nombre,
// //       edad: req.body.edad,
// //       lugarProcedencia: req.body.lugarProcedencia
// //     };
// //     usuario.push(nuevoUsuario);
// //     res.redirect('/usuarios');
    
// //   });

  //Borrar usuario

  app.delete("/usuarios/:nombre", (req, res) =>{
    const nombre =req.params.nombre;
    usuarios = usuarios.filter(u => u.nombre !== nombre)
    console.log(`El usuario ${nombre} ha sido eliminado`)
  })


app.listen(3000, () => {
    console.log('el servidor está escuchando en el http://localhost:3000');
  });
