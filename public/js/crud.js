const API_URL = '/api/users'; // Ruta base de la API para usuarios
const userForm = document.getElementById('userForm');
const userList = document.getElementById('users');

// Función para mostrar usuarios en la lista
const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    // Limpiar la lista antes de agregar elementos
    userList.innerHTML = '';

    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span><strong>Usuario:</strong> ${user.username} | <strong>Email:</strong> ${user.email}</span>
        <button onclick="deleteUser('${user._id}')">Eliminar</button>
        <button onclick="editUser('${user._id}', '${user.username}', '${user.email}')">Editar</button>
      `;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

// Función para agregar un usuario
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      userForm.reset(); // Limpiar el formulario
      fetchUsers(); // Actualizar la lista
    } else {
      console.error('Error al agregar usuario');
    }
  } catch (error) {
    console.error('Error al enviar usuario:', error);
  }
});

// Función para eliminar un usuario
const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchUsers(); // Actualizar la lista
    } else {
      console.error('Error al eliminar usuario');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};

// Función para editar un usuario
const editUser = async (id, username, email) => {
  const newUsername = prompt('Editar nombre de usuario:', username);
  const newEmail = prompt('Editar correo electrónico:', email);

  if (newUsername && newEmail) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername, email: newEmail }),
      });

      if (response.ok) {
        fetchUsers(); // Actualizar la lista
      } else {
        console.error('Error al editar usuario');
      }
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  }
};

// Cargar usuarios al iniciar
fetchUsers();
