const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_USERS_URL = `${API_URL}/users`;

// REGISTRO
export async function registrarUsuario({ name, email, password }) {
  const res = await fetch(`${API_USERS_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error en el registro");
  return data;
}

// VERIFICAR EMAIL
export async function verificarEmail({ email, otp }) {
  const res = await fetch(`${API_USERS_URL}/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error en la verificación");
  return data;
}

// LOGIN
export async function loginUsuario({ email, password }) {
  const res = await fetch(`${API_USERS_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Para incluir cookies
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error en el login");
  
  // Guardar tokens si vienen en la respuesta
  if (data.data?.accessToken) {
    localStorage.setItem("accessToken", data.data.accessToken);
  }
  if (data.data?.refreshToken) {
    localStorage.setItem("refreshToken", data.data.refreshToken);
  }
  
  return data;
}

// OBTENER PERFIL (requiere estar logueado)
export async function obtenerPerfil() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No hay token, inicia sesión");
  const res = await fetch(`${API_USERS_URL}/user-details`, {
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener el perfil");
  return data.data;
}

// LOGOUT
export async function logoutUsuario() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    // Si no hay token, solo limpiar localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return { success: true, message: "Sesión cerrada" };
  }
  
  try {
    const res = await fetch(`${API_USERS_URL}/logout`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    
    const data = await res.json();
    
    // Limpiar tokens del localStorage independientemente de la respuesta del servidor
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    if (!res.ok) {
      console.warn("Error en logout del servidor:", data.message);
      // Aunque haya error en el servidor, consideramos el logout exitoso en el cliente
      return { success: true, message: "Sesión cerrada localmente" };
    }
    
    return data;
  } catch (error) {
    // En caso de error de red, también limpiar tokens localmente
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.error("Error de red en logout:", error);
    return { success: true, message: "Sesión cerrada localmente" };
  }
}

// ACTUALIZAR PERFIL DE USUARIO
export async function actualizarPerfil(userId, datosUsuario) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No hay token, inicia sesión");
  
  const res = await fetch(`${API_USERS_URL}/${userId}`, {
    method: "PUT",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(datosUsuario)
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al actualizar el perfil");
  return data;
}