// React y dependencias externas
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Material-UI
import { 
  TextField, 
  Button, 
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Divider,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography
} from '@mui/material'

// Íconos
import { 
  Person,
  LocationOn,
  CreditCard,
  LocalShipping,
  ExpandMore,
  CheckCircle,
  ArrowBack,
  Security,
  AccountBalance,
  Payment
} from '@mui/icons-material'

const CheckOut = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Estados del formulario
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Datos simulados del carrito
  const cartItems = [
    {
      id: 1,
      name: "Men Opaque Casual Shirt",
      price: 20.00,
      quantity: 2,
      image: "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      price: 15.99,
      quantity: 1,
      image: "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.19; // 19% IVA
  const total = subtotal + shipping + tax;

  const steps = ['Información Personal', 'Dirección de Envío', 'Método de Pago', 'Confirmación'];

  const handleInputChange = (section, field, value) => {
    if (section === 'customer') {
      setCustomerInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simular procesamiento
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 3000);
  };

  if (orderComplete) {
    return (
      <section className='min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4'>
        <div className='container mx-auto max-w-2xl'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-green-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg'>
              <CheckCircle className='text-white text-4xl' />
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mb-4'>¡Pedido Confirmado!</h1>
            <p className='text-gray-600 mb-6'>
              Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación en breve.
            </p>
            <div className='bg-white rounded-xl p-6 shadow-lg mb-6'>
              <h3 className='font-semibold text-lg mb-2'>Número de Orden</h3>
              <p className='text-2xl font-bold text-[#ff5252]'>#ORD-{Date.now().toString().slice(-6)}</p>
            </div>
            <div className='space-x-4'>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                  background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  textTransform: 'none',
                  fontWeight: '600',
                }}
              >
                Continuar Comprando
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/orders')}
                sx={{
                  borderColor: '#ff5252',
                  color: '#ff5252',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  textTransform: 'none',
                  fontWeight: '600',
                }}
              >
                Ver Mis Pedidos
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4'>
      <div className='container mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8'>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
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
            Continuar Comprando
          </Button>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Finalizar Compra</h1>
          <p className='text-gray-600'>Completa tu información para procesar el pedido</p>
        </div>

        {/* Stepper */}
        <div className='mb-8'>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Formulario Principal */}
          <div className='lg:col-span-2'>
            <Card className='shadow-xl rounded-2xl border border-gray-100'>
              <CardContent className='p-8'>
                {/* Paso 1: Información Personal */}
                {activeStep === 0 && (
                  <div className='space-y-6'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-10 h-10 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full flex items-center justify-center'>
                        <Person className='text-white text-sm' />
                      </div>
                      <h2 className='text-xl font-bold text-gray-800'>Información Personal</h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <TextField
                        label="Nombre"
                        placeholder="Tu nombre"
                        variant="outlined"
                        fullWidth
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                      <TextField
                        label="Apellido"
                        placeholder="Tu apellido"
                        variant="outlined"
                        fullWidth
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                    </div>

                    <TextField
                      label="Correo Electrónico"
                      placeholder="tu@email.com"
                      type="email"
                      variant="outlined"
                      fullWidth
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />

                    <TextField
                      label="Teléfono"
                      placeholder="3001234567"
                      variant="outlined"
                      fullWidth
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />
                  </div>
                )}

                {/* Paso 2: Dirección de Envío */}
                {activeStep === 1 && (
                  <div className='space-y-6'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-10 h-10 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full flex items-center justify-center'>
                        <LocationOn className='text-white text-sm' />
                      </div>
                      <h2 className='text-xl font-bold text-gray-800'>Dirección de Envío</h2>
                    </div>

                    <TextField
                      label="Dirección"
                      placeholder="Calle 123 # 45-67"
                      variant="outlined"
                      fullWidth
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <TextField
                        label="Ciudad"
                        placeholder="Bogotá"
                        variant="outlined"
                        fullWidth
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                      <TextField
                        label="Departamento"
                        placeholder="Cundinamarca"
                        variant="outlined"
                        fullWidth
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <TextField
                        label="Código Postal"
                        placeholder="110111"
                        variant="outlined"
                        fullWidth
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                      <TextField
                        label="País"
                        variant="outlined"
                        fullWidth
                        value={shippingInfo.country}
                        disabled
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                    </div>

                    {/* Método de Envío */}
                    <div className='mt-8'>
                      <h3 className='text-lg font-semibold text-gray-800 mb-4'>Método de Envío</h3>
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={shippingMethod}
                          onChange={(e) => setShippingMethod(e.target.value)}
                        >
                          <div className='space-y-3'>
                            <div className='border border-gray-200 rounded-xl p-4 hover:border-[#ff5252] transition-colors'>
                              <FormControlLabel 
                                value="standard" 
                                control={<Radio />} 
                                label={
                                  <div>
                                    <div className='font-semibold'>Envío Estándar</div>
                                    <div className='text-sm text-gray-600'>5-7 días hábiles - Gratis en compras +$50</div>
                                  </div>
                                }
                              />
                            </div>
                            <div className='border border-gray-200 rounded-xl p-4 hover:border-[#ff5252] transition-colors'>
                              <FormControlLabel 
                                value="express" 
                                control={<Radio />} 
                                label={
                                  <div>
                                    <div className='font-semibold'>Envío Express</div>
                                    <div className='text-sm text-gray-600'>2-3 días hábiles - $9.99</div>
                                  </div>
                                }
                              />
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                )}

                {/* Paso 3: Método de Pago */}
                {activeStep === 2 && (
                  <div className='space-y-6'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-10 h-10 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full flex items-center justify-center'>
                        <CreditCard className='text-white text-sm' />
                      </div>
                      <h2 className='text-xl font-bold text-gray-800'>Método de Pago</h2>
                    </div>

                    {/* Selección de método de pago */}
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <div className='space-y-3'>
                          <div className='border border-gray-200 rounded-xl p-4 hover:border-[#ff5252] transition-colors'>
                            <FormControlLabel 
                              value="credit-card" 
                              control={<Radio />} 
                              label={
                                <div className='flex items-center gap-2'>
                                  <CreditCard className='text-gray-600' />
                                  <span className='font-semibold'>Tarjeta de Crédito/Débito</span>
                                </div>
                              }
                            />
                          </div>
                          <div className='border border-gray-200 rounded-xl p-4 hover:border-[#ff5252] transition-colors'>
                            <FormControlLabel 
                              value="bank-transfer" 
                              control={<Radio />} 
                              label={
                                <div className='flex items-center gap-2'>
                                  <AccountBalance className='text-gray-600' />
                                  <span className='font-semibold'>Transferencia Bancaria</span>
                                </div>
                              }
                            />
                          </div>
                          <div className='border border-gray-200 rounded-xl p-4 hover:border-[#ff5252] transition-colors'>
                            <FormControlLabel 
                              value="pse" 
                              control={<Radio />} 
                              label={
                                <div className='flex items-center gap-2'>
                                  <Payment className='text-gray-600' />
                                  <span className='font-semibold'>PSE</span>
                                </div>
                              }
                            />
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>

                    {/* Formulario de tarjeta */}
                    {paymentMethod === 'credit-card' && (
                      <div className='mt-6 space-y-4'>
                        <TextField
                          label="Número de Tarjeta"
                          placeholder="1234 5678 9012 3456"
                          variant="outlined"
                          fullWidth
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            }
                          }}
                        />
                        
                        <TextField
                          label="Nombre en la Tarjeta"
                          placeholder="Nombre como aparece en la tarjeta"
                          variant="outlined"
                          fullWidth
                          value={paymentInfo.cardName}
                          onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            }
                          }}
                        />

                        <div className='grid grid-cols-2 gap-4'>
                          <TextField
                            label="Fecha de Vencimiento"
                            placeholder="MM/AA"
                            variant="outlined"
                            fullWidth
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                              }
                            }}
                          />
                          <TextField
                            label="CVV"
                            placeholder="123"
                            variant="outlined"
                            fullWidth
                            value={paymentInfo.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                              }
                            }}
                          />
                        </div>

                        <div className='bg-blue-50 rounded-xl p-4 mt-4'>
                          <div className='flex items-center gap-2 mb-2'>
                            <Security className='text-blue-600 text-sm' />
                            <span className='text-sm font-semibold text-blue-800'>Compra Segura</span>
                          </div>
                          <p className='text-xs text-blue-700'>
                            Tu información está protegida con encriptación SSL de 256 bits. No almacenamos datos de tarjetas.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Paso 4: Confirmación */}
                {activeStep === 3 && (
                  <div className='space-y-6'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-10 h-10 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full flex items-center justify-center'>
                        <CheckCircle className='text-white text-sm' />
                      </div>
                      <h2 className='text-xl font-bold text-gray-800'>Confirmar Pedido</h2>
                    </div>

                    {/* Resumen de información */}
                    <div className='space-y-4'>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">Información Personal</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className='space-y-2'>
                            <p><strong>Nombre:</strong> {customerInfo.firstName} {customerInfo.lastName}</p>
                            <p><strong>Email:</strong> {customerInfo.email}</p>
                            <p><strong>Teléfono:</strong> {customerInfo.phone}</p>
                          </div>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">Dirección de Envío</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className='space-y-2'>
                            <p><strong>Dirección:</strong> {shippingInfo.address}</p>
                            <p><strong>Ciudad:</strong> {shippingInfo.city}, {shippingInfo.state}</p>
                            <p><strong>Código Postal:</strong> {shippingInfo.zipCode}</p>
                            <p><strong>País:</strong> {shippingInfo.country}</p>
                          </div>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">Método de Pago</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className='space-y-2'>
                            <p><strong>Método:</strong> {
                              paymentMethod === 'credit-card' ? 'Tarjeta de Crédito/Débito' :
                              paymentMethod === 'bank-transfer' ? 'Transferencia Bancaria' : 'PSE'
                            }</p>
                            {paymentMethod === 'credit-card' && paymentInfo.cardNumber && (
                              <p><strong>Tarjeta:</strong> ****{paymentInfo.cardNumber.slice(-4)}</p>
                            )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <Alert severity="info" sx={{ borderRadius: '12px' }}>
                      Al hacer clic en "Finalizar Pedido", aceptas nuestros términos y condiciones de venta.
                    </Alert>
                  </div>
                )}

                {/* Botones de navegación */}
                <div className='flex justify-between mt-8 pt-6 border-t border-gray-200'>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{
                      color: '#6b7280',
                      textTransform: 'none',
                      '&:disabled': {
                        color: '#d1d5db'
                      }
                    }}
                  >
                    Anterior
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                        borderRadius: '12px',
                        padding: '12px 24px',
                        textTransform: 'none',
                        fontWeight: '600',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                        },
                      }}
                    >
                      {isProcessing ? 'Procesando...' : 'Finalizar Pedido'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                        borderRadius: '12px',
                        padding: '12px 24px',
                        textTransform: 'none',
                        fontWeight: '600',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                        },
                      }}
                    >
                      Siguiente
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del Pedido */}
          <div className='lg:col-span-1'>
            <Card className='shadow-xl rounded-2xl border border-gray-100 sticky top-8'>
              <CardContent className='p-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>Resumen del Pedido</h3>
                
                {/* Productos */}
                <div className='space-y-4 mb-6'>
                  {cartItems.map((item) => (
                    <div key={item.id} className='flex gap-3'>
                      <div className='w-16 h-16 rounded-lg overflow-hidden flex-shrink-0'>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-sm font-medium text-gray-800 line-clamp-2'>
                          {item.name}
                        </h4>
                        <div className='flex justify-between items-center mt-1'>
                          <span className='text-sm text-gray-600'>Cant: {item.quantity}</span>
                          <span className='text-sm font-semibold text-[#ff5252]'>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Divider />

                {/* Totales */}
                <div className='space-y-3 mt-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Subtotal:</span>
                    <span className='font-medium'>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Envío:</span>
                    <span className='font-medium'>
                      {shipping === 0 ? (
                        <span className='text-green-600'>Gratis</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>IVA (19%):</span>
                    <span className='font-medium'>${tax.toFixed(2)}</span>
                  </div>
                  <Divider />
                  <div className='flex justify-between text-lg font-bold'>
                    <span>Total:</span>
                    <span className='text-[#ff5252]'>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Beneficios */}
                <div className='mt-6 space-y-2'>
                  <div className='flex items-center gap-2 text-sm text-green-600'>
                    <CheckCircle className='text-xs' />
                    <span>Envío gratis en compras +$50</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-green-600'>
                    <CheckCircle className='text-xs' />
                    <span>Garantía de devolución 30 días</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-green-600'>
                    <CheckCircle className='text-xs' />
                    <span>Soporte 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
