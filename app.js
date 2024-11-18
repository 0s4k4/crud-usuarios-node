const express = require('express');
const mongoose = require('mongoose'); // Corrige el typo en "mongose"
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a Cosmos DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a CosmosDB'))
  .catch((err) => console.error('Error de conexión con CosmosDB:', err));


// Rutas de la API
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/crud'));

// Iniciando el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${PORT}`)); // Corrige las comillas para usar interpolación
