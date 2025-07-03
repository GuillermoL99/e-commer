// React y dependencias externas
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  DialogActions
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
  LocalOffer
} from '@mui/icons-material'

const Profile = () => {
  const navigate = useNavigate();
  
  // Estados del perfil
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Datos del usuario
  const [userInfo, setUserInfo] = useState({
    firstName: 'Juan Carlos',
    lastName: 'Rodríguez',
    email: 'juan.rodriguez@email.com',
    phone: '+57 301 234 5678',
    birthDate: '1990-03-15',
    gender: 'Masculino',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

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
    if (section === 'user') {
      setUserInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'address') {
      setAddressInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'password') {
      setPasswordData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simular guardado
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      setSuccessMessage('Perfil actualizado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
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
                        disabled={!isEditing}
                        type="email"
                        fullWidth
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

                      <TextField
                        label="Fecha de Nacimiento"
                        value={userInfo.birthDate}
                        onChange={(e) => handleInputChange('user', 'birthDate', e.target.value)}
                        disabled={!isEditing}
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />

                      <TextField
                        label="Género"
                        value={userInfo.gender}
                        onChange={(e) => handleInputChange('user', 'gender', e.target.value)}
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

                    <Card className='border border-gray-200'>
                      <CardContent className='p-6'>
                        <div className='flex justify-between items-start mb-4'>
                          <div>
                            <h3 className='text-lg font-semibold text-gray-800 mb-2'>Dirección Principal</h3>
                            <Chip label="Predeterminada" color="primary" size="small" sx={{ borderRadius: '8px' }} />
                          </div>
                          <IconButton>
                            <Edit />
                          </IconButton>
                        </div>
                        <div className='text-gray-600 space-y-1'>
                          <p>{addressInfo.address}</p>
                          <p>{addressInfo.city}, {addressInfo.state}</p>
                          <p>{addressInfo.zipCode}</p>
                          <p>{addressInfo.country}</p>
                        </div>
                      </CardContent>
                    </Card>
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
