// React y dependencias externas
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Contexto de autenticación
import { useAuth } from '../../components/hooks/useAuth'

// API
import { actualizarPerfil } from '../../components/api/auth'
import { crearDireccion, obtenerDirecciones, actualizarDireccion, eliminarDireccion } from '../../components/api/addresses'

// Estilos
import './styles.css'

// Material-UI
import { 
  TextField, 
  Button, 
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Chip,
  Alert,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

// Íconos
import { 
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Visibility,
  VisibilityOff,
  Security,
  ShoppingBag,
  FavoriteBorder,
  CreditCard,
  LocalShipping,
  Notifications,
  Settings,
  ExitToApp,
  ExpandMore,
  CheckCircle,
  AccessTime,
  LocalOffer,
  Add,
  Delete,
  Home,
  Work
} from '@mui/icons-material'

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUser } = useAuth();
  
  // Redirigir si no está autenticado
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Estados del perfil
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estados para direcciones
  const [addresses, setAddresses] = useState([]);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressFormData, setAddressFormData] = useState({
    address_line: '',
    city: '',
    country: '',
    state: '',
    pincode: '',
    address_type: 'casa'
  });

  // Datos del usuario - usando datos reales del contexto de autenticación
  const [userInfo, setUserInfo] = useState({
    firstName: user?.name?.split(' ')[0] || 'Nombre',
    lastName: user?.name?.split(' ').slice(1).join(' ') || 'Apellido',
    email: user?.email || 'email@ejemplo.com',
    phone: user?.mobile?.toString() || '',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // Actualizar datos cuando cambie el usuario
  React.useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user.name?.split(' ')[0] || 'Nombre',
        lastName: user.name?.split(' ').slice(1).join(' ') || 'Apellido',
        email: user.email || 'email@ejemplo.com',
        phone: user.mobile?.toString() || '',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      });
    }
  }, [user]);

  // Cargar direcciones cuando se seleccione la pestaña de direcciones
  React.useEffect(() => {
    if (activeTab === 'addresses' && isAuthenticated) {
      loadAddresses();
    }
  }, [activeTab, isAuthenticated]);

  const loadAddresses = async () => {
    try {
      const userAddresses = await obtenerDirecciones();
      setAddresses(userAddresses || []);
    } catch (error) {
      console.error('Error al cargar direcciones:', error);
      setErrorMessage('Error al cargar las direcciones');
    }
  };

  const [addressInfo, setAddressInfo] = useState({
    address: 'Calle 123 # 45-67',
    city: 'Bogotá',
    state: 'Cundinamarca',
    zipCode: '110111',
    country: 'Colombia'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Datos simulados de pedidos
  const recentOrders = [
    {
      id: '#ORD-001234',
      date: '2024-12-15',
      status: 'Entregado',
      total: 89.99,
      items: 3,
      statusColor: 'success'
    },
    {
      id: '#ORD-001235',
      date: '2024-12-10',
      status: 'En Tránsito',
      total: 156.50,
      items: 2,
      statusColor: 'info'
    },
    {
      id: '#ORD-001236',
      date: '2024-12-05',
      status: 'Procesando',
      total: 45.00,
      items: 1,
      statusColor: 'warning'
    }
  ];

  const menuItems = [
    { id: 'personal', label: 'Información Personal', icon: <Person /> },
    { id: 'orders', label: 'Mis Pedidos', icon: <ShoppingBag /> },
    { id: 'addresses', label: 'Direcciones', icon: <LocationOn /> },
    { id: 'payments', label: 'Métodos de Pago', icon: <CreditCard /> },
    { id: 'security', label: 'Seguridad', icon: <Security /> },
    { id: 'notifications', label: 'Notificaciones', icon: <Notifications /> }
  ];

  const handleInputChange = (section, field, value) => {
    // Limpiar mensajes de error cuando el usuario empiece a editar
    if (errorMessage) {
      setErrorMessage('');
    }
    
    if (section === 'user') {
      setUserInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'address') {
      setAddressInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'password') {
      setPasswordData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setErrorMessage(''); // Limpiar errores previos
    
    try {
      // Validaciones básicas
      if (!userInfo.firstName.trim() || !userInfo.lastName.trim()) {
        throw new Error('El nombre y apellido son obligatorios');
      }
      
      // Preparar los datos para enviar al backend
      const datosActualizar = {
        name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
        mobile: userInfo.phone ? parseInt(userInfo.phone.replace(/\D/g, '')) || null : null // Convertir a número y limpiar caracteres no numéricos
      };

      // Llamar a la API para actualizar el perfil
      const result = await actualizarPerfil(user._id, datosActualizar);
      
      console.log('Perfil actualizado:', result);

      setSuccessMessage('Perfil actualizado exitosamente');

      // Actualizar los datos del usuario en el contexto
      const updatedUser = await refreshUser();
      console.log('Datos del usuario actualizados:', updatedUser);

      // También actualizar el estado local inmediatamente con los datos actualizados
      if (result.data) {
        setUserInfo({
          firstName: result.data.name?.split(' ')[0] || 'Nombre',
          lastName: result.data.name?.split(' ').slice(1).join(' ') || 'Apellido',
          email: result.data.email || 'email@ejemplo.com',
          phone: result.data.mobile?.toString() || '',
          avatar: result.data.avatar || userInfo.avatar
        });
      }
      
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setSuccessMessage(''); // Limpiar mensaje de éxito si hay error
      setErrorMessage(error.message || 'Error al actualizar el perfil');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }
    
    setIsLoading(true);
    
    // Simular cambio de contraseña
    setTimeout(() => {
      setIsLoading(false);
      setShowPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccessMessage('Contraseña actualizada exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  const handleLogout = () => {
    // Lógica de logout
    navigate('/login');
  };

  // Funciones para manejar direcciones
  const handleAddressInputChange = (field, value) => {
    setAddressFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleOpenAddressDialog = (address = null) => {
    if (address) {
      // Modo edición
      setEditingAddress(address);
      setAddressFormData({
        address_line: address.address_line || '',
        city: address.city || '',
        country: address.country || '',
        state: address.state || '',
        pincode: address.pincode || '',
        address_type: address.address_type || 'casa'
      });
    } else {
      // Modo creación
      setEditingAddress(null);
      setAddressFormData({
        address_line: '',
        city: '',
        country: '',
        state: '',
        pincode: '',
        address_type: 'casa'
      });
    }
    setShowAddressDialog(true);
  };

  const handleCloseAddressDialog = () => {
    setShowAddressDialog(false);
    setEditingAddress(null);
    setAddressFormData({
      address_line: '',
      city: '',
      country: '',
      state: '',
      pincode: '',
      address_type: 'casa'
    });
  };

  const handleSaveAddress = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Validaciones
      if (!addressFormData.address_line.trim() || !addressFormData.city.trim() || 
          !addressFormData.country.trim() || !addressFormData.state.trim() || 
          !addressFormData.pincode.trim()) {
        throw new Error('Todos los campos son obligatorios');
      }

      if (editingAddress) {
        // Actualizar dirección existente
        await actualizarDireccion(editingAddress._id, addressFormData);
        setSuccessMessage('Dirección actualizada correctamente');
      } else {
        // Crear nueva dirección
        await crearDireccion(addressFormData);
        setSuccessMessage('Dirección agregada correctamente');
      }

      // Recargar las direcciones
      await loadAddresses();
      handleCloseAddressDialog();
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error al guardar dirección:', error);
      setErrorMessage(error.message || 'Error al guardar la dirección');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
      return;
    }

    try {
      await eliminarDireccion(addressId);
      setSuccessMessage('Dirección eliminada correctamente');
      await loadAddresses();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error al eliminar dirección:', error);
      setErrorMessage(error.message || 'Error al eliminar la dirección');
    }
  };

  return (
    <section className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4'>
      <div className='container mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Mi Perfil</h1>
          <p className='text-gray-600'>Gestiona tu información personal y configuraciones</p>
        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <Alert 
            severity="success" 
            sx={{ mb: 3, borderRadius: '12px' }}
            onClose={() => setSuccessMessage('')}
          >
            {successMessage}
          </Alert>
        )}

        {/* Mensaje de error */}
        {errorMessage && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: '12px' }}
            onClose={() => setErrorMessage('')}
          >
            {errorMessage}
          </Alert>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <Card className='shadow-xl rounded-2xl border border-gray-100 sticky top-8'>
              <CardContent className='p-6'>
                {/* Avatar y info básica */}
                <div className='text-center mb-6'>
                  <div className='relative inline-block'>
                    <Avatar
                      src={userInfo.avatar}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mb: 2,
                        border: '3px solid #fff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    />
                    <IconButton
                      className='!absolute !bottom-0 !right-0 !w-8 !h-8 !bg-[#ff5252] hover:!bg-[#e04848] !text-white !shadow-lg'
                      size="small"
                    >
                      <PhotoCamera fontSize="small" />
                    </IconButton>
                  </div>
                  <h3 className='text-xl font-bold text-gray-800'>
                    {userInfo.firstName} {userInfo.lastName}
                  </h3>
                  <p className='text-gray-600 text-sm'>{userInfo.email}</p>
                </div>

                {/* Menú de navegación */}
                <List className='space-y-1'>
                  {menuItems.map((item) => (
                    <ListItemButton
                      key={item.id}
                      selected={activeTab === item.id}
                      onClick={() => setActiveTab(item.id)}
                      sx={{
                        borderRadius: '12px',
                        mb: 1,
                        '&.Mui-selected': {
                          backgroundColor: '#fff5f5',
                          color: '#ff5252',
                          '& .MuiListItemIcon-root': {
                            color: '#ff5252'
                          }
                        },
                        '&:hover': {
                          backgroundColor: '#fafafa'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: '14px',
                          fontWeight: activeTab === item.id ? 600 : 400
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Logout */}
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    borderRadius: '12px',
                    color: '#dc2626',
                    '&:hover': {
                      backgroundColor: '#fef2f2'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <ExitToApp sx={{ color: '#dc2626' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Cerrar Sesión"
                    primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }}
                  />
                </ListItemButton>
              </CardContent>
            </Card>
          </div>

          {/* Contenido Principal */}
          <div className='lg:col-span-3'>
            <Card className='shadow-xl rounded-2xl border border-gray-100'>
              <CardContent className='p-8'>
                
                {/* Información Personal */}
                {activeTab === 'personal' && (
                  <div>
                    <div className='flex justify-between items-center mb-6'>
                      <h2 className='text-2xl font-bold text-gray-800'>Información Personal</h2>
                      {!isEditing ? (
                        <Button
                          startIcon={<Edit />}
                          onClick={() => setIsEditing(true)}
                          sx={{
                            color: '#ff5252',
                            borderColor: '#ff5252',
                            borderRadius: '12px',
                            textTransform: 'none',
                            '&:hover': {
                              borderColor: '#e04848',
                              backgroundColor: '#fff5f5'
                            }
                          }}
                          variant="outlined"
                        >
                          Editar
                        </Button>
                      ) : (
                        <div className='space-x-2'>
                          <Button
                            startIcon={<Cancel />}
                            onClick={() => setIsEditing(false)}
                            sx={{
                              color: '#6b7280',
                              borderRadius: '12px',
                              textTransform: 'none'
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button
                            startIcon={<Save />}
                            onClick={handleSaveProfile}
                            disabled={isLoading}
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                              borderRadius: '12px',
                              textTransform: 'none',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                              }
                            }}
                          >
                            {isLoading ? 'Guardando...' : 'Guardar'}
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <TextField
                        label="Nombre"
                        value={userInfo.firstName}
                        onChange={(e) => handleInputChange('user', 'firstName', e.target.value)}
                        disabled={!isEditing}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                      
                      <TextField
                        label="Apellido"
                        value={userInfo.lastName}
                        onChange={(e) => handleInputChange('user', 'lastName', e.target.value)}
                        disabled={!isEditing}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />

                      <TextField
                        label="Correo Electrónico"
                        value={userInfo.email}
                        onChange={(e) => handleInputChange('user', 'email', e.target.value)}
                        disabled={true} // Siempre deshabilitado
                        type="email"
                        fullWidth
                        helperText={isEditing ? "El correo electrónico no se puede modificar" : ""}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />

                      <TextField
                        label="Teléfono"
                        value={userInfo.phone}
                        onChange={(e) => handleInputChange('user', 'phone', e.target.value)}
                        disabled={!isEditing}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Mis Pedidos */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6'>Mis Pedidos</h2>
                    
                    <div className='space-y-4'>
                      {recentOrders.map((order) => (
                        <Card key={order.id} className='border border-gray-200 hover:shadow-lg transition-shadow'>
                          <CardContent className='p-6'>
                            <div className='flex justify-between items-start'>
                              <div className='flex-1'>
                                <div className='flex items-center gap-3 mb-2'>
                                  <h3 className='text-lg font-semibold text-gray-800'>{order.id}</h3>
                                  <Chip
                                    label={order.status}
                                    color={order.statusColor}
                                    size="small"
                                    sx={{ borderRadius: '8px' }}
                                  />
                                </div>
                                <div className='text-sm text-gray-600 space-y-1'>
                                  <p>📅 {new Date(order.date).toLocaleDateString('es-ES')}</p>
                                  <p>📦 {order.items} productos</p>
                                  <p className='text-lg font-bold text-[#ff5252]'>${order.total}</p>
                                </div>
                              </div>
                              <div className='space-x-2'>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: '#ff5252',
                                    color: '#ff5252',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    '&:hover': {
                                      borderColor: '#e04848',
                                      backgroundColor: '#fff5f5'
                                    }
                                  }}
                                >
                                  Ver Detalles
                                </Button>
                                {order.status === 'Entregado' && (
                                  <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                      background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                                      borderRadius: '8px',
                                      textTransform: 'none'
                                    }}
                                  >
                                    Reordenar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className='text-center mt-8'>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/my-orders')}
                        sx={{
                          borderColor: '#ff5252',
                          color: '#ff5252',
                          borderRadius: '12px',
                          textTransform: 'none',
                          padding: '12px 24px',
                          '&:hover': {
                            borderColor: '#e04848',
                            backgroundColor: '#fff5f5'
                          }
                        }}
                      >
                        Ver Todos los Pedidos
                      </Button>
                    </div>
                  </div>
                )}

                {/* Direcciones */}
                {activeTab === 'addresses' && (
                  <div>
                    <div className='flex justify-between items-center mb-6'>
                      <h2 className='text-2xl font-bold text-gray-800'>Direcciones</h2>
                      <Button
                        startIcon={<Add />}
                        onClick={() => handleOpenAddressDialog()}
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                          borderRadius: '12px',
                          textTransform: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                          }
                        }}
                      >
                        Agregar Dirección
                      </Button>
                    </div>

                    {addresses.length === 0 ? (
                      <div className='text-center py-12'>
                        <LocationOn sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
                        <h3 className='text-xl font-semibold text-gray-600 mb-2'>No tienes direcciones guardadas</h3>
                        <p className='text-gray-500 mb-4'>Agrega una dirección para facilitar tus compras</p>
                        <Button
                          startIcon={<Add />}
                          onClick={() => handleOpenAddressDialog()}
                          variant="outlined"
                          sx={{
                            borderColor: '#ff5252',
                            color: '#ff5252',
                            borderRadius: '12px',
                            textTransform: 'none',
                            '&:hover': {
                              borderColor: '#e04848',
                              backgroundColor: '#fff5f5'
                            }
                          }}
                        >
                          Agregar Primera Dirección
                        </Button>
                      </div>
                    ) : (
                      <div className='space-y-4'>
                        {addresses.map((address, index) => (
                          <Card key={address._id} className='border border-gray-200 hover:shadow-lg transition-shadow'>
                            <CardContent className='p-6'>
                              <div className='flex justify-between items-start'>
                                <div className='flex-1'>
                                  <div className='flex items-center gap-3 mb-2'>
                                    <div className='flex items-center gap-2'>
                                      {address.address_type === 'casa' ? 
                                        <Home sx={{ color: '#ff5252' }} /> : 
                                        <Work sx={{ color: '#ff5252' }} />
                                      }
                                      <h3 className='text-lg font-semibold text-gray-800 capitalize'>
                                        {address.address_type}
                                      </h3>
                                    </div>
                                    {index === 0 && (
                                      <Chip 
                                        label="Principal" 
                                        color="primary" 
                                        size="small" 
                                        sx={{ borderRadius: '8px' }} 
                                      />
                                    )}
                                  </div>
                                  <div className='text-gray-600 space-y-1'>
                                    <p className='font-medium'>{address.address_line}</p>
                                    <p>{address.state}, {address.country}</p>
                                    <p>Código Postal: {address.pincode}</p>
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <IconButton
                                    onClick={() => handleOpenAddressDialog(address)}
                                    sx={{
                                      color: '#6b7280',
                                      '&:hover': {
                                        color: '#ff5252',
                                        backgroundColor: '#fff5f5'
                                      }
                                    }}
                                  >
                                    <Edit />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleDeleteAddress(address._id)}
                                    sx={{
                                      color: '#6b7280',
                                      '&:hover': {
                                        color: '#dc2626',
                                        backgroundColor: '#fef2f2'
                                      }
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Métodos de Pago */}
                {activeTab === 'payments' && (
                  <div>
                    <div className='flex justify-between items-center mb-6'>
                      <h2 className='text-2xl font-bold text-gray-800'>Métodos de Pago</h2>
                      <Button
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                          borderRadius: '12px',
                          textTransform: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                          }
                        }}
                      >
                        Agregar Tarjeta
                      </Button>
                    </div>

                    <div className='text-center py-12'>
                      <CreditCard sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
                      <h3 className='text-xl font-semibold text-gray-600 mb-2'>No hay métodos de pago</h3>
                      <p className='text-gray-500 mb-4'>Agrega una tarjeta para realizar compras más rápido</p>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: '#ff5252',
                          color: '#ff5252',
                          borderRadius: '12px',
                          textTransform: 'none',
                          '&:hover': {
                            borderColor: '#e04848',
                            backgroundColor: '#fff5f5'
                          }
                        }}
                      >
                        Agregar Primera Tarjeta
                      </Button>
                    </div>
                  </div>
                )}

                {/* Seguridad */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6'>Seguridad</h2>
                    
                    <div className='space-y-6'>
                      <Card className='border border-gray-200'>
                        <CardContent className='p-6'>
                          <div className='flex justify-between items-center'>
                            <div>
                              <h3 className='text-lg font-semibold text-gray-800 mb-1'>Contraseña</h3>
                              <p className='text-gray-600 text-sm'>Última actualización: Hace 2 meses</p>
                            </div>
                            <Button
                              variant="outlined"
                              onClick={() => setShowPasswordDialog(true)}
                              sx={{
                                borderColor: '#ff5252',
                                color: '#ff5252',
                                borderRadius: '12px',
                                textTransform: 'none',
                                '&:hover': {
                                  borderColor: '#e04848',
                                  backgroundColor: '#fff5f5'
                                }
                              }}
                            >
                              Cambiar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className='border border-gray-200'>
                        <CardContent className='p-6'>
                          <div className='flex justify-between items-center'>
                            <div>
                              <h3 className='text-lg font-semibold text-gray-800 mb-1'>Autenticación de Dos Factores</h3>
                              <p className='text-gray-600 text-sm'>Agrega una capa extra de seguridad</p>
                            </div>
                            <Chip label="Desactivado" color="error" variant="outlined" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Notificaciones */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6'>Notificaciones</h2>
                    
                    <div className='space-y-4'>
                      {[
                        { title: 'Actualizaciones de Pedidos', desc: 'Recibe notificaciones sobre el estado de tus pedidos' },
                        { title: 'Ofertas y Promociones', desc: 'Mantente al día con ofertas especiales' },
                        { title: 'Newsletter', desc: 'Recibe nuestro boletín semanal con novedades' },
                        { title: 'Recordatorios de Carrito', desc: 'Te recordamos los productos que dejaste en el carrito' }
                      ].map((item, index) => (
                        <Card key={index} className='border border-gray-200'>
                          <CardContent className='p-6'>
                            <div className='flex justify-between items-center'>
                              <div>
                                <h3 className='text-lg font-semibold text-gray-800 mb-1'>{item.title}</h3>
                                <p className='text-gray-600 text-sm'>{item.desc}</p>
                              </div>
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                                  borderRadius: '8px',
                                  textTransform: 'none',
                                  minWidth: '80px'
                                }}
                              >
                                Activar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog para agregar/editar dirección */}
      <Dialog 
        open={showAddressDialog} 
        onClose={handleCloseAddressDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: { borderRadius: '16px' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {editingAddress ? 'Editar Dirección' : 'Agregar Nueva Dirección'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className='space-y-6 mt-4'>
            <TextField
              label="Dirección"
              value={addressFormData.address_line}
              onChange={(e) => handleAddressInputChange('address_line', e.target.value)}
              fullWidth
              multiline
              rows={2}
              placeholder="Calle, número, apartamento, etc."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
                mb: 4 // Agregar más margen inferior al campo de dirección
              }}
            />
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <TextField
                label="País"
                value={addressFormData.country}
                onChange={(e) => handleAddressInputChange('country', e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
              
              <TextField
                label="Ciudad"
                value={addressFormData.city}
                onChange={(e) => handleAddressInputChange('city', e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
              <TextField
                label="Provincia"
                value={addressFormData.state}
                onChange={(e) => handleAddressInputChange('state', e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
              
              <TextField
                label="Código Postal"
                value={addressFormData.pincode}
                onChange={(e) => handleAddressInputChange('pincode', e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </div>

            <div className='mt-6'>
              <FormControl fullWidth>
                <InputLabel>Tipo de Dirección</InputLabel>
                <Select
                  value={addressFormData.address_type}
                  onChange={(e) => handleAddressInputChange('address_type', e.target.value)}
                  label="Tipo de Dirección"
                  sx={{
                    borderRadius: '12px',
                  }}
                >
                  <MenuItem value="casa">
                    <div className='flex items-center gap-2'>
                      <Home />
                      <span>Casa</span>
                    </div>
                  </MenuItem>
                  <MenuItem value="trabajo">
                    <div className='flex items-center gap-2'>
                      <Work />
                      <span>Trabajo</span>
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleCloseAddressDialog}
            sx={{ 
              color: '#6b7280',
              textTransform: 'none',
              borderRadius: '12px'
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSaveAddress}
            disabled={isLoading || !addressFormData.address_line.trim() || !addressFormData.city.trim() || !addressFormData.country.trim() || !addressFormData.state.trim() || !addressFormData.pincode.trim()}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
              borderRadius: '12px',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
              }
            }}
          >
            {isLoading ? 'Guardando...' : (editingAddress ? 'Actualizar' : 'Guardar')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para cambiar contraseña */}
      <Dialog 
        open={showPasswordDialog} 
        onClose={() => setShowPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: { borderRadius: '16px' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Cambiar Contraseña
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className='space-y-4 mt-4'>
            <TextField
              label="Contraseña Actual"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={(e) => handleInputChange('password', 'currentPassword', e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
            
            <TextField
              label="Nueva Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => handleInputChange('password', 'newPassword', e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />
            
            <TextField
              label="Confirmar Nueva Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => handleInputChange('password', 'confirmPassword', e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setShowPasswordDialog(false)}
            sx={{ 
              color: '#6b7280',
              textTransform: 'none',
              borderRadius: '12px'
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleChangePassword}
            disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
              borderRadius: '12px',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
              }
            }}
          >
            {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Profile;
