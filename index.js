const express = require('express');
const app = express();
const cors = require('cors');


require('dotenv').config();

app.use(cors()); // This allows ALL origins. For production, specify your frontend URL.

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