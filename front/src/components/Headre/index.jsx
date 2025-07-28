// React y dependencias externas
import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// Contexto de autenticación
import { useAuth } from "../hooks/useAuth"

// Estilos
import './styles.css'

// Material-UI
import { 
  Badge, 
  IconButton, 
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Button,
  CircularProgress
} from "@mui/material"
import { styled } from "@mui/material/styles"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

// Íconos
import { 
  Person,
  ShoppingBag,
  Settings,
  ExitToApp,
  AccountCircle,
  Favorite,
  Compare
} from "@mui/icons-material"

// Componentes locales
import Search from "../Search"
import Navegacion from "./Navegacion"
import { MyContext } from "../../App"

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      handleMenuClose();
      navigate('/'); // Redirigir a la landing page en lugar de login
    } catch (error) {
      console.error('Error durante logout:', error);
      // Navegar de todas formas ya que el logout local se ejecuta
      handleMenuClose();
      navigate('/'); // Redirigir a la landing page en lugar de login
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  return (
    <header className="bg-white w-full">
      {/* Top Strip */}
      <div className="container top-strip border-t border-b border-gray-200">
        <div className="w-full px-2 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="col1 w-full md:w-[50%] md:text-left">
              <p className="text-[10px] md:text-[10px] font-light">
                Descubre lo mejor en electrodomésticos y equipación para el hogar
              </p>
            </div>
            <div className="col2 w-full md:w-0 flex items-center justify-center md:justify-end">
              <ul className="flex items-center gap-3">
                <li>
                  <a href="/nosotros" className="text-xs md:text-10px link font-medium transition">Nosotros</a>
                </li>
                <li>
                  <a href="/contacto" className="text-xs md:text-10px link font-medium transition">Contactos</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header py-4 border-b border-gray-200">
        <div className="w-full px-20 mx-auto flex flex-col md:flex-row items-center justify-between ">
          {/* Logo */}
          <div className="col1 w-full md:w-[30%] flex justify-center md:justify-start mb-2 md:mb-0">
            <a href="/">
              <img src="../../../public/logo.png" alt="Logo" className="w-36 h-auto mx-auto md:mx-0" />
            </a>
          </div>
          {/* Search */}
          <div className="col2 w-full md:w-[80%] mb-2 md:mb-0 flex justify-center">
            <Search />
          </div>
          {/* Iconos & Login/Register */}
          <div className="col3 w-full md:w-[40%] flex items-center justify-center md:justify-end pl-0 md:pl-6">
            <ul className={`flex items-center flex-wrap justify-center header-actions ${isAuthenticated ? 'logged-in' : ''}`}>
              
              {/* Menú de usuario */}
              <li>
                {loading ? (
                  <CircularProgress size={24} />
                ) : isAuthenticated ? (
                  <>
                    <Tooltip title="Mi Perfil">
                      <Box 
                        onClick={handleMenuOpen}
                        className="user-profile-section"
                      >
                        <Avatar
                          src={user?.avatar || '/default-avatar.png'}
                          className="user-avatar"
                        >
                          {!user?.avatar && user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </Avatar>
                        <Box className="user-info">
                          <Typography className="user-name">
                            {user?.name || 'Usuario'}
                          </Typography>
                          <Typography className="user-email">
                            {user?.email || 'email@ejemplo.com'}
                          </Typography>
                        </Box>
                      </Box>
                    </Tooltip>
                    
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      className="user-menu"
                      PaperProps={{
                        elevation: 3,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          borderRadius: '12px',
                          minWidth: 250,
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      {/* Header del menú con info del usuario */}
                      <Box className="user-menu-header">
                        <Box className="user-menu-header-content">
                          <Avatar
                            src={user?.avatar || '/default-avatar.png'}
                            className="user-menu-avatar"
                          >
                            {!user?.avatar && user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </Avatar>
                          <Box className="user-menu-info">
                            <Typography variant="body2">
                              {user?.name || 'Usuario'}
                            </Typography>
                            <Typography variant="caption">
                              {user?.email || 'email@ejemplo.com'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Divider />
                      
                      <MenuItem onClick={handleProfileClick} className="user-menu-item">
                        <ListItemIcon>
                          <Person fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Mi Perfil</ListItemText>
                      </MenuItem>
                      
                      <MenuItem onClick={() => { handleMenuClose(); navigate('/my-orders'); }} className="user-menu-item">
                        <ListItemIcon>
                          <ShoppingBag fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Mis Pedidos</ListItemText>
                      </MenuItem>
                      
                      <MenuItem onClick={handleMenuClose} className="user-menu-item">
                        <ListItemIcon>
                          <Favorite fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Favoritos</ListItemText>
                      </MenuItem>
                      
                      <MenuItem onClick={handleMenuClose} className="user-menu-item">
                        <ListItemIcon>
                          <Compare fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Comparar</ListItemText>
                      </MenuItem>
                      
                      <MenuItem onClick={handleMenuClose} className="user-menu-item">
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Configuración</ListItemText>
                      </MenuItem>
                      
                      <Divider />
                      
                      <MenuItem onClick={handleLogout} disabled={isLoggingOut} className="user-menu-item logout">
                        <ListItemIcon>
                          {isLoggingOut ? (
                            <CircularProgress size={16} />
                          ) : (
                            <ExitToApp fontSize="small" />
                          )}
                        </ListItemIcon>
                        <ListItemText>
                          {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
                        </ListItemText>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  // Botones para usuarios no autenticados
                  <div className="flex items-center gap-2">
                    <Link to="/login">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: '#ff5252',
                          color: '#ff5252',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontSize: '12px',
                          padding: '4px 12px',
                          '&:hover': {
                            borderColor: '#e04848',
                            backgroundColor: 'rgba(255, 82, 82, 0.05)',
                          }
                        }}
                      >
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: '#ff5252',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontSize: '12px',
                          padding: '4px 12px',
                          '&:hover': {
                            backgroundColor: '#e04848',
                          }
                        }}
                      >
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                )}
              </li>
              
              {/* Carrito - siempre al final */}
              <li>
                <Tooltip title="Carrito">
                  <IconButton 
                    aria-label="cart" 
                    onClick={()=>context.setOpenCarritoPanel(true)}
                    className="cart-button"
                  >
                    <StyledBadge badgeContent={1} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <Navegacion />
    </header>
  );
};

export default Header;