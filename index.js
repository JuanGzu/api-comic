const express = require('express');
const app = express();
require('dotenv').config();

// Importar rutas
const routes = require('./routes/index');

// Middleware para entender JSON
app.use(express.json());

// Usar las rutas
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});