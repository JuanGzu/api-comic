const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./firebase');

app.use(cors());

// Nuestro inventario de cómics falso (Mock Data)
const comics = [
  {
    id: "1",
    titulo: "Daredevil: Born Again",
    autor: "Frank Miller",
    precio: 19.99,
    imagen: "https://m.media-amazon.com/images/I/81+j2GDUyRL.jpg",
    descripcion: "Kingpin descubre la identidad secreta de Daredevil y comienza a destruir la vida de Matt Murdock pieza por pieza."
  },
  {
    id: "2",
    titulo: "Batman: The Killing Joke",
    autor: "Alan Moore",
    precio: 15.50,
    imagen: "https://m.media-amazon.com/images/I/81t2A4prYmS.jpg",
    descripcion: "El Joker escapa de Arkham Asylum y ataca a la familia del Comisionado Gordon para probar que cualquiera puede volverse loco."
  },
  {
    id: "3",
    titulo: "Spider-Man: Kraven's Last Hunt",
    autor: "J.M. DeMatteis",
    precio: 17.00,
    imagen: "https://m.media-amazon.com/images/I/81gC2L219jL.jpg",
    descripcion: "Kraven el Cazador decide que la única forma de demostrar que es superior a Spider-Man es derrotarlo y tomar su lugar."
  }
];

// La ruta que va a consumir Xcode
app.get('/api/comics', (req, res) => {
  res.json(getFirebaseElement("1")); // Aquí puedes cambiar el ID para obtener diferentes cómics
});

// Configuración del puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`La API de cómics está corriendo en el puerto ${PORT}`);
});

async function getFirebaseElement(id) {
  try {
    const userRef = db.collection('usuarios').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      console.log('No se encontró el documento');
    } else {
      console.log('Datos del documento:', doc.data());
      return doc.data();
    }
  } catch (error) {
    console.error('Error al obtener el elemento:', error);
  }
}