// React y dependencias externas
import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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
  Box
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado simulado de login
  
  // Datos simulados del usuario
  const userData = {
    firstName: 'Juan Carlos',
    lastName: 'Rodríguez',
    email: 'juan.rodriguez@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleMenuClose();
    navigate('/login');
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
            <ul className={`flex items-center flex-wrap justify-center header-actions ${isLoggedIn ? 'logged-in' : ''}`}>
              {/* Login/Register - Solo si no está logueado */}
              {!isLoggedIn && (
                <li className="auth-links">
                  <Link
                    to="/login"
                    className="link transition color-red text-xs md:text-base font-medium hover:text-[#ff5252]"
                  >
                    Login
                  </Link>
                  <span className="text-gray-400"> | </span>
                  <Link
                    to="/register"
                    className="link transition color-red text-xs md:text-base font-medium hover:text-[#ff5252]"
                  >
                    Register
                  </Link>
                </li>
              )}
              
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
              
              {/* Menú de usuario */}
              <li>
                {isLoggedIn ? (
                  <>
                    <Tooltip title="Mi Perfil">
                      <Box 
                        onClick={handleMenuOpen}
                        className="user-profile-section"
                      >
                        <Avatar
                          src={userData.avatar}
                          className="user-avatar"
                        />
                        <Box className="user-info">
                          <Typography className="user-name">
                            {userData.firstName} {userData.lastName}
                          </Typography>
                          <Typography className="user-email">
                            {userData.email}
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
                            src={userData.avatar}
                            className="user-menu-avatar"
                          />
                          <Box className="user-menu-info">
                            <Typography variant="body2">
                              {userData.firstName} {userData.lastName}
                            </Typography>
                            <Typography variant="caption">
                              {userData.email}
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
                      
                      <MenuItem onClick={handleLogout} className="user-menu-item logout">
                        <ListItemIcon>
                          <ExitToApp fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Cerrar Sesión</ListItemText>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Tooltip title="Iniciar Sesión">
                    <IconButton onClick={() => navigate('/login')}>
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                )}
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