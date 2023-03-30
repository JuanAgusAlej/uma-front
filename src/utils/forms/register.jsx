import axios from 'axios';
import { emailRegex, passwordRegex } from './regex.jsx';

const validate = (email, userName, password, passwordConfirm) => {
  const errores = {};

  if (!email || email === '') {
    errores.email = 'El campo Email es obligatorio';
  } else if (!emailRegex.test(email)) {
    errores.email = 'El campo Email no es válido';
  }
  if (!userName || userName === '') {
    errores.userName = 'El campo Nombre del usuario es obligatorio';
  }

  if (!password) {
    errores.password = 'El campo Contraseña es obligatorio';
  } else if (!passwordRegex.test(password)) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial';
  }

  if (!passwordConfirm) {
    errores.passwordConfirm = 'Repite tu contraseña';
  } else if (password !== passwordConfirm) {
    errores.passwordConfirm = 'Las contraseñas no coinciden';
  }

  return errores;
};

const funcRegister = async (
  setErrors,
  email,
  setOpen,
  setMessage,
  userName,
  password,
  passwordConfirm,
  navigate,
) => {
  const VerificateForm = validate(email, userName, password, passwordConfirm);
  setErrors(VerificateForm);
  if (Object.keys(VerificateForm).length === 0) {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/register',
        {
          name: userName,
          email,
          password,
        },
      );
      if (response.data.error) {
        setOpen(false);
        setMessage({
          description: response.data.message,
          title: 'Error',
          status: 'error',
        });
        setOpen(true);
      } else {
        setOpen(false);
        setMessage({
          description: 'Se ha registrado la cuenta',
          title: 'Éxito',
          status: 'success',
        });
        setOpen(true);
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (error) {
      setOpen(false);
      setMessage({
        description: 'Ha ocurrido un error al registrar la cuenta',
        title: 'Error',
        status: 'error',
      });
      setOpen(true);
    }
  }
};

export { funcRegister };
