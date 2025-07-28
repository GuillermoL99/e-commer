import { useState, useEffect, createContext, useContext } from 'react';
import { obtenerPerfil, logoutUsuario } from '../api/auth';

// Crear contexto de autenticación
const AuthContext = createContext(null);

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Siempre obtener los datos frescos del servidor
        const userData = await obtenerPerfil();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      setUser(null);
      setIsAuthenticated(false);
      // Limpiar tokens si hay error
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const userData = await obtenerPerfil();
        setUser(userData);
        return userData;
      }
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Llamar a la API de logout
      const result = await logoutUsuario();
      console.log('Logout exitoso:', result.message);
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
      // Continuar con el logout local aunque haya error en el servidor
    } finally {
      // Limpiar estado local independientemente del resultado del servidor
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
