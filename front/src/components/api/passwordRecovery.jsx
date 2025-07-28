// API para recuperación de contraseña

const API_BASE_URL = 'http://localhost:3000/api/users';

// Solicitar código de recuperación de contraseña
export const solicitarRecuperacionPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al solicitar recuperación de contraseña');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error de conexión');
  }
};

// Verificar código OTP para recuperación de contraseña
export const verificarCodigoRecuperacion = async (email, otp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-forgot-password-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al verificar código OTP');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error de conexión');
  }
};

// Restablecer contraseña
export const restablecerPassword = async (email, newPassword, confirmPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        newPassword, 
        confirPassword: confirmPassword 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al restablecer contraseña');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error de conexión');
  }
};
