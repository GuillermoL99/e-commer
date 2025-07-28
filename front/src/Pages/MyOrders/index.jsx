// React y dependencias externas
import React, { useState, useEffect } from 'react'
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

// API functions (uncomment when backend is ready)
// import { fetchUserOrders } from '../../components/api/orders';

const MyOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las órdenes del usuario
  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Uncomment this when your backend is ready:
      // const ordersData = await fetchUserOrders();
      // setOrders(ordersData);
      
      // Datos simulados basados en el esquema de la base de datos
      // Remove this simulation when connecting to real API
      const simulatedOrders = [
        {
          _id: '675a1b2c3d4e5f6789012345',
          orderId: 'ORD-001234',
          userId: '675a1b2c3d4e5f6789012340',
          productId: '675a1b2c3d4e5f6789012341',
          product_details: {
            name: 'Men Opaque Casual Shirt',
            Image: [
              'https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg',
              'https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg'
            ]
          },
          paymentId: 'PAY-123456789',
          payment_status: 'completed',
          delivery_address: {
            _id: '675a1b2c3d4e5f6789012342',
            street: 'Calle 123 # 45-67',
            city: 'Bogotá',
            state: 'Cundinamarca',
            country: 'Colombia',
            postalCode: '110111'
          },
          subTotalAmt: 45.00,
          totalAmt: 45.00,
          invoice_receipt: 'INV-001234',
          createdAt: '2024-12-15T10:30:00Z',
          updatedAt: '2024-12-15T10:30:00Z'
        },
        {
          _id: '675a1b2c3d4e5f6789012346',
          orderId: 'ORD-001235',
          userId: '675a1b2c3d4e5f6789012340',
          productId: '675a1b2c3d4e5f6789012343',
          product_details: {
            name: 'Wireless Headphones',
            Image: [
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
            ]
          },
          paymentId: 'PAY-987654321',
          payment_status: 'pending',
          delivery_address: {
            _id: '675a1b2c3d4e5f6789012344',
            street: 'Carrera 15 # 93-07',
            city: 'Bogotá',
            state: 'Cundinamarca',
            country: 'Colombia',
            postalCode: '110221'
          },
          subTotalAmt: 89.99,
          totalAmt: 89.99,
          invoice_receipt: 'INV-001235',
          createdAt: '2024-12-10T14:15:00Z',
          updatedAt: '2024-12-10T14:15:00Z'
        },
        {
          _id: '675a1b2c3d4e5f6789012347',
          orderId: 'ORD-001236',
          userId: '675a1b2c3d4e5f6789012340',
          productId: '675a1b2c3d4e5f6789012345',
          product_details: {
            name: 'Gaming Mouse',
            Image: [
              'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
            ]
          },
          paymentId: '',
          payment_status: 'processing',
          delivery_address: {
            _id: '675a1b2c3d4e5f6789012346',
            street: 'Avenida 68 # 22-35',
            city: 'Bogotá',
            state: 'Cundinamarca',
            country: 'Colombia',
            postalCode: '110331'
          },
          subTotalAmt: 45.00,
          totalAmt: 45.00,
          invoice_receipt: '',
          createdAt: '2024-12-05T09:20:00Z',
          updatedAt: '2024-12-05T09:20:00Z'
        }
      ];
      
      setOrders(simulatedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  // Función para mapear el estado de pago a estado de pedido
  const getOrderStatus = (paymentStatus) => {
    switch (paymentStatus) {
      case 'completed':
        return { status: 'Entregado', color: 'success' };
      case 'pending':
        return { status: 'En Tránsito', color: 'info' };
      case 'processing':
        return { status: 'Procesando', color: 'warning' };
      case 'failed':
        return { status: 'Cancelado', color: 'error' };
      default:
        return { status: 'Procesando', color: 'warning' };
    }
  };

  // Función para formatear la dirección
  const formatAddress = (address) => {
    if (!address) return 'Sin dirección';
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
  };

  const getStatusIcon = (paymentStatus) => {
    const { status } = getOrderStatus(paymentStatus);
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

  const filteredOrders = orders.filter(order => {
    const { status } = getOrderStatus(order.payment_status);
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product_details.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
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
    // Lógica para reordenar - navegar a la página del producto
    navigate(`/product/${order.productId}`);
  };

  // Mostrar loading
  if (loading) {
    return (
      <section className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <div className='flex justify-center items-center min-h-[400px]'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5252] mx-auto mb-4'></div>
              <p className='text-gray-600'>Cargando pedidos...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <section className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
          <Button
            variant="contained"
            onClick={fetchUserOrders}
            sx={{
              background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
              borderRadius: '12px',
              textTransform: 'none',
            }}
          >
            Reintentar
          </Button>
        </div>
      </section>
    );
  }

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
            {currentOrders.map((order) => {
              const { status, color } = getOrderStatus(order.payment_status);
              return (
                <Card key={order._id} className='shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow'>
                  <CardContent className='p-6'>
                    <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                      {/* Información principal */}
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-3'>
                          <h3 className='text-xl font-bold text-gray-800'>#{order.orderId}</h3>
                          <Chip
                            icon={getStatusIcon(order.payment_status)}
                            label={status}
                            color={color}
                            sx={{ 
                              borderRadius: '12px',
                              fontWeight: 600
                            }}
                          />
                        </div>
                        
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600'>
                          <div>
                            <span className='font-semibold'>Fecha:</span><br />
                            {new Date(order.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div>
                            <span className='font-semibold'>Total:</span><br />
                            <span className='text-lg font-bold text-[#ff5252]'>${order.totalAmt.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className='font-semibold'>Producto:</span><br />
                            {order.product_details.name}
                          </div>
                        </div>

                        {/* Preview del producto */}
                        <div className='flex gap-2 mt-4'>
                          {order.product_details.Image && order.product_details.Image.length > 0 && (
                            <img 
                              src={order.product_details.Image[0]} 
                              alt={order.product_details.name}
                              className='w-12 h-12 rounded-lg object-cover border border-gray-200'
                            />
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
                        
                        {order.payment_status === 'completed' && (
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

                        {order.paymentId && (
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
                            Pago: {order.paymentId}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

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
                  Detalles del Pedido #{selectedOrder.orderId}
                </Typography>
                <Chip
                  icon={getStatusIcon(selectedOrder.payment_status)}
                  label={getOrderStatus(selectedOrder.payment_status).status}
                  color={getOrderStatus(selectedOrder.payment_status).color}
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
                      <p><strong>Fecha:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString('es-ES')}</p>
                      <p><strong>Subtotal:</strong> <span className='text-[#ff5252] font-bold'>${selectedOrder.subTotalAmt.toFixed(2)}</span></p>
                      <p><strong>Total:</strong> <span className='text-[#ff5252] font-bold'>${selectedOrder.totalAmt.toFixed(2)}</span></p>
                      {selectedOrder.paymentId && (
                        <p><strong>ID de Pago:</strong> {selectedOrder.paymentId}</p>
                      )}
                      {selectedOrder.invoice_receipt && (
                        <p><strong>Factura:</strong> {selectedOrder.invoice_receipt}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-2'>Dirección de Envío</h4>
                    <p className='text-sm text-gray-600'>{formatAddress(selectedOrder.delivery_address)}</p>
                  </div>
                </div>

                <Divider />

                {/* Producto */}
                <div>
                  <h4 className='font-semibold text-gray-800 mb-4'>Producto</h4>
                  <div className='flex gap-4 p-4 border border-gray-200 rounded-xl'>
                    {selectedOrder.product_details.Image && selectedOrder.product_details.Image.length > 0 && (
                      <img 
                        src={selectedOrder.product_details.Image[0]} 
                        alt={selectedOrder.product_details.name}
                        className='w-16 h-16 rounded-lg object-cover'
                      />
                    )}
                    <div className='flex-1'>
                      <h5 className='font-semibold text-gray-800'>{selectedOrder.product_details.name}</h5>
                      <div className='flex justify-between items-center mt-2'>
                        <span className='text-sm text-gray-600'>Cantidad: 1</span>
                        <span className='font-bold text-[#ff5252]'>${selectedOrder.totalAmt.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Galería de imágenes del producto */}
                  {selectedOrder.product_details.Image && selectedOrder.product_details.Image.length > 1 && (
                    <div className='mt-4'>
                      <h5 className='font-semibold text-gray-800 mb-2'>Galería de Imágenes</h5>
                      <div className='flex gap-2 overflow-x-auto'>
                        {selectedOrder.product_details.Image.map((image, index) => (
                          <img 
                            key={index}
                            src={image} 
                            alt={`${selectedOrder.product_details.name} - ${index + 1}`}
                            className='w-20 h-20 rounded-lg object-cover flex-shrink-0'
                          />
                        ))}
                      </div>
                    </div>
                  )}
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
              {selectedOrder.payment_status === 'completed' && (
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
