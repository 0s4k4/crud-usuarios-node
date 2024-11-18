const express = require('express');
const User = require('../models/User'); // Importa el modelo de usuarios
const router = express.Router();

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // No enviar las contraseñas
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Crear un nuevo usuario
router.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Validar datos
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
  
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
  
      // Crear usuario
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error('Error al crear usuario:', error.message); // Mensaje específico
      res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
  });

// Actualizar un usuario existente
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
