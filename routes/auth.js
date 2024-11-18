const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa el modelo de usuarios
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Iniciando el registro:', { username, email, password }); // Log para ver los datos recibidos

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña antes de guardar
    console.log('Encriptando contraseña...');
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptación de la contraseña

    console.log('Contraseña encriptada:', hashedPassword); // Verifica la contraseña encriptada

    // Crear nuevo usuario con la contraseña encriptada
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log('Usuario registrado exitosamente');
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Inicio de sesión SIN bcrypt
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Solicitud de inicio de sesión:', { email, password });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es válida directamente sin bcrypt
    if (user.password !== password) {  // Comparación directa de las contraseñas en texto plano
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h', // El token expira en una hora
    });

    res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
