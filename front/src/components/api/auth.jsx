const API_URL = "http://localhost:3000/api/usuarios"; // Cambia el puerto si tu backend usa otro

// REGISTRO
export async function registrarUsuario({ nombre, apellido, email, password, telefono, direccion }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, email, password, telefono, direccion }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Error en el registro");
  return data;
}

// LOGIN
export async function loginUsuario({ email, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Error en el login");
  // Guardar el token en localStorage (o en el contexto/app si prefieres)
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

// OBTENER PERFIL (requiere estar logueado)
export async function obtenerPerfil() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, inicia sesión");
  const res = await fetch(`${API_URL}/me`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Error al obtener el perfil");
  return data.usuario;
}