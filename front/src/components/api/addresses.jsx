const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_ADDRESSES_URL = `${API_URL}/addresses`;

// CREAR NUEVA DIRECCIÓN
export async function crearDireccion(direccionData) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No hay token, inicia sesión");
  
  const res = await fetch(`${API_ADDRESSES_URL}/create`, {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(direccionData)
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear la dirección");
  return data;
}

// OBTENER TODAS LAS DIRECCIONES DEL USUARIO
export async function obtenerDirecciones() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No hay token, inicia sesión");
  
  const res = await fetch(API_ADDRESSES_URL, {
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener las direcciones");
  return data.data;
}

// ACTUALIZAR DIRECCIÓN
export async function actualizarDireccion(addressId, direccionData) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No hay token, inicia sesión");
  
  const res = await fetch(`${API_ADDRESSES_URL}/${addressId}`, {
    method: "PUT",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(direccionData)
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al actualizar la dirección");
  return data;
}

// ELIMINAR DIRECCIÓN
export async function eliminarDireccion(addressId) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No hay token, inicia sesión");
  
  const res = await fetch(`${API_ADDRESSES_URL}/${addressId}`, {
    method: "DELETE",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar la dirección");
  return data;
}
