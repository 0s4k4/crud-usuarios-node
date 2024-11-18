document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada.
  
      // Accede a los valores de los campos
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Verifica si los campos no están vacíos
      if (!email || !password) {
        console.error('Por favor, ingrese ambos campos.');
        return;
      }
  
      // Aquí puedes hacer la solicitud a tu backend para validar el login
      console.log('Email:', email);
      console.log('Password:', password);
  
      // Ejemplo de cómo podrías hacer una solicitud POST (ajusta la URL a tu API)
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Login exitoso');
          // Redirigir o hacer algo más con la respuesta
        } else {
          console.error('Login fallido');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
    });
  });
  