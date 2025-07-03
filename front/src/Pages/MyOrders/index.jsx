// React y dependencias externas
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Material-UI
import { 
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Box
} from '@mui/material'

// Íconos
import { 
  Search,
  FilterList,
  Visibility,
  LocalShipping,
  CheckCircle,
  AccessTime,
  Cancel,
  Refresh,
  ArrowBack
} from '@mui/icons-material'

const MyOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  // Datos simulados de pedidos más completos
  const allOrders = [
    {
      id: '#ORD-001234',
      date: '2024-12-15',
      status: 'Entregado',
      total: 89.99,
      items: [
        {
          name: 'Men Opaque Casual Shirt',
          price: 45.00,
          quantity: 1,
          image: 'https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg'
        },
        {
          name: 'Premium Cotton T-Shirt',
          price: 44.99,
          quantity: 1,
          image: 'https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg'
        }
      ],
      statusColor: 'success',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-12-16',
      shippingAddress: 'Calle 123 # 45-67, Bogotá, Colombia'
    },
    {
      id: '#ORD-001235',
      date: '2024-12-10',
      status: 'En Tránsito',
      total: 156.50,
      items: [
        {
          name: 'Wireless Headphones',
          price: 89.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
        },
        {
          name: 'Phone Case',
          price: 25.50,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop'
        }
      ],
      statusColor: 'info',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-12-18',
      shippingAddress: 'Carrera 15 # 93-07, Bogotá, Colombia'
    },
    {
      id: '#ORD-001236',
      date: '2024-12-05',
      status: 'Procesando',
      total: 45.00,
      items: [
        {
          name: 'Gaming Mouse',
          price: 45.00,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop'
        }
      ],
      statusColor: 'warning',
      trackingNumber: null,
      estimatedDelivery: '2024-12-20',
      shippingAddress: 'Avenida 68 # 22-35, Bogotá, Colombia'
    },
    {
      id: '#ORD-001237',
      date: '2024-11-28',
      status: 'Cancelado',
      total: 75.25,
      items: [
        {
          name: 'Smart Watch',
          price: 75.25,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=100&h=100&fit=crop'
        }
      ],
      statusColor: 'error',
      trackingNumber: null,
      estimatedDelivery: null,
      shippingAddress: 'Calle 100 # 15-20, Bogotá, Colombia'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Entregado':
        return <CheckCircle />;
      case 'En Tránsito':
        return <LocalShipping />;
      case 'Procesando':
        return <AccessTime />;
      case 'Cancelado':
        return <Cancel />;
      default:
        return <AccessTime />;
    }
  };

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ordersPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleReorder = (order) => {
    // Lógica para reordenar
    console.log('Reordenando:', order.id);
  };

  return (
    <section className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4'>
      <div className='container mx-auto max-w-6xl'>
        {/* Header */}
        <div className='mb-8'>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/profile')}
            sx={{
              color: '#6b7280',
              textTransform: 'none',
              mb: 2,
              '&:hover': {
                color: '#ff5252',
                backgroundColor: 'transparent'
              }
            }}
          >
            Volver al Perfil
          </Button>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Mis Pedidos</h1>
          <p className='text-gray-600'>Historial completo de tus compras</p>
        </div>

        {/* Filtros y búsqueda */}
        <Card className='shadow-lg rounded-2xl border border-gray-100 mb-6'>
          <CardContent className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <TextField
                placeholder="Buscar por número de orden o producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
                fullWidth
              />
              
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Estado"
                  sx={{
                    borderRadius: '12px',
                  }}
                >
                  <MenuItem value="all">Todos los estados</MenuItem>
                  <MenuItem value="Procesando">Procesando</MenuItem>
                  <MenuItem value="En Tránsito">En Tránsito</MenuItem>
                  <MenuItem value="Entregado">Entregado</MenuItem>
                  <MenuItem value="Cancelado">Cancelado</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{
                  borderColor: '#ff5252',
                  color: '#ff5252',
                  borderRadius: '12px',
                  textTransform: 'none',
                  height: '56px',
                  '&:hover': {
                    borderColor: '#e04848',
                    backgroundColor: '#fff5f5'
                  }
                }}
              >
                Más Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de pedidos */}
        {currentOrders.length === 0 ? (
          <Card className='shadow-lg rounded-2xl border border-gray-100'>
            <CardContent className='p-12 text-center'>
              <LocalShipping sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
              <h3 className='text-xl font-semibold text-gray-600 mb-2'>No se encontraron pedidos</h3>
              <p className='text-gray-500 mb-4'>
                {searchTerm || statusFilter !== 'all' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Aún no has realizado ningún pedido'
                }
              </p>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                  background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                  }
                }}
              >
                Comenzar a Comprar
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='space-y-4'>
            {currentOrders.map((order) => (
              <Card key={order.id} className='shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow'>
                <CardContent className='p-6'>
                  <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                    {/* Información principal */}
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-3'>
                        <h3 className='text-xl font-bold text-gray-800'>{order.id}</h3>
                        <Chip
                          icon={getStatusIcon(order.status)}
                          label={order.status}
                          color={order.statusColor}
                          sx={{ 
                            borderRadius: '12px',
                            fontWeight: 600
                          }}
                        />
                      </div>
                      
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600'>
                        <div>
                          <span className='font-semibold'>Fecha:</span><br />
                          {new Date(order.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div>
                          <span className='font-semibold'>Total:</span><br />
                          <span className='text-lg font-bold text-[#ff5252]'>${order.total}</span>
                        </div>
                        <div>
                          <span className='font-semibold'>Productos:</span><br />
                          {order.items.length} artículo{order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>

                      {/* Preview de productos */}
                      <div className='flex gap-2 mt-4 overflow-x-auto'>
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className='flex-shrink-0'>
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className='w-12 h-12 rounded-lg object-cover border border-gray-200'
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className='w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600'>
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className='flex flex-col gap-2 lg:min-w-[200px]'>
                      <Button
                        startIcon={<Visibility />}
                        onClick={() => handleViewOrder(order)}
                        variant="outlined"
                        fullWidth
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
                        Ver Detalles
                      </Button>
                      
                      {order.status === 'Entregado' && (
                        <Button
                          startIcon={<Refresh />}
                          onClick={() => handleReorder(order)}
                          variant="contained"
                          fullWidth
                          sx={{
                            background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                            borderRadius: '12px',
                            textTransform: 'none',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                            }
                          }}
                        >
                          Reordenar
                        </Button>
                      )}

                      {order.trackingNumber && (
                        <Button
                          startIcon={<LocalShipping />}
                          variant="text"
                          fullWidth
                          sx={{
                            color: '#6b7280',
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontSize: '12px'
                          }}
                        >
                          Rastrear: {order.trackingNumber}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className='flex justify-center mt-8'>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: '12px',
                    },
                    '& .Mui-selected': {
                      background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de detalle de pedido */}
      <Dialog 
        open={showOrderDetail} 
        onClose={() => setShowOrderDetail(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: { borderRadius: '16px' }
        }}
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              <div className='flex items-center justify-between'>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  Detalles del Pedido {selectedOrder.id}
                </Typography>
                <Chip
                  icon={getStatusIcon(selectedOrder.status)}
                  label={selectedOrder.status}
                  color={selectedOrder.statusColor}
                  sx={{ borderRadius: '12px', fontWeight: 600 }}
                />
              </div>
            </DialogTitle>
            
            <DialogContent>
              <div className='space-y-6'>
                {/* Información general */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-2'>Información del Pedido</h4>
                    <div className='text-sm text-gray-600 space-y-1'>
                      <p><strong>Fecha:</strong> {new Date(selectedOrder.date).toLocaleDateString('es-ES')}</p>
                      <p><strong>Total:</strong> <span className='text-[#ff5252] font-bold'>${selectedOrder.total}</span></p>
                      {selectedOrder.trackingNumber && (
                        <p><strong>Seguimiento:</strong> {selectedOrder.trackingNumber}</p>
                      )}
                      {selectedOrder.estimatedDelivery && (
                        <p><strong>Entrega estimada:</strong> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('es-ES')}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-2'>Dirección de Envío</h4>
                    <p className='text-sm text-gray-600'>{selectedOrder.shippingAddress}</p>
                  </div>
                </div>

                <Divider />

                {/* Productos */}
                <div>
                  <h4 className='font-semibold text-gray-800 mb-4'>Productos ({selectedOrder.items.length})</h4>
                  <div className='space-y-3'>
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className='flex gap-4 p-4 border border-gray-200 rounded-xl'>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className='w-16 h-16 rounded-lg object-cover'
                        />
                        <div className='flex-1'>
                          <h5 className='font-semibold text-gray-800'>{item.name}</h5>
                          <div className='flex justify-between items-center mt-2'>
                            <span className='text-sm text-gray-600'>Cantidad: {item.quantity}</span>
                            <span className='font-bold text-[#ff5252]'>${item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 1 }}>
              <Button 
                onClick={() => setShowOrderDetail(false)}
                sx={{ 
                  color: '#6b7280',
                  textTransform: 'none',
                  borderRadius: '12px'
                }}
              >
                Cerrar
              </Button>
              {selectedOrder.status === 'Entregado' && (
                <Button 
                  onClick={() => handleReorder(selectedOrder)}
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
                  Reordenar
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </section>
  );
};

export default MyOrders;
