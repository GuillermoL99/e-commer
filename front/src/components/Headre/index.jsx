import React, { useState } from "react";
import Search from "../Search";
import Navegacion from "./Navegacion";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IoIosGitCompare } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import Modal from "../login/Modal";
import { LoginForm, RegisterForm } from "../login/Modal/AuthForm";
import { useAuthUser } from "../login/useAuthUser";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [successMsg, setSuccessMsg] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, login, logout } = useAuthUser();

  const openModal = (type) => {
    setModalType(type);
    setSuccessMsg("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSuccessMsg("");
  };

  function handleAuthSuccess(data) {
    setSuccessMsg(data.msg || "¡Operación exitosa!");
    setTimeout(() => {
      closeModal();
      if (data.usuario) login(data.usuario); // login con datos reales
      else if (data.token) login(data); // fallback
    }, 1200);
  }

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
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
          {/* Iconos & Login/Register o Usuario */}
          <div className="col3 w-full md:w-[40%] flex items-center justify-center md:justify-end pl-0 md:pl-6">
            <ul className="flex items-center gap-8 flex-wrap justify-center">
              {!user ? (
                <li>
                  <button
                    onClick={() => openModal("login")}
                    className="link transition color-red text-10px md:text-base font-medium"
                  >
                    Login
                  </button>
                  <span className="hidden md:inline"> | </span>
                  <button
                    onClick={() => openModal("register")}
                    className="link transition color-red text-xs md:text-base font-medium ml-0 md:ml-1"
                  >
                    
                  </button>
                </li>
              ) : (
                <li className="relative">
                  <button
                    className="font-medium text-base flex items-center gap-2 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    {user.nombre || user.email}
                    <svg className={`w-4 h-4 transform transition ${menuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                      <a
                        href="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Perfil
                      </a>
                      <a
                        href="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Favoritos
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </li>
              )}
              <li>
                <Tooltip title="Carrito">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={1} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Comparar">
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={1} color="secondary">
                      <IoIosGitCompare />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Favoritos">
                  <IconButton aria-label="favorite">
                    <StyledBadge badgeContent={1} color="secondary">
                      <AiOutlineHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal para Login/Register */}
      <Modal open={modalOpen} onClose={closeModal}>
        {successMsg ? (
          <div className="text-center py-8 text-green-700 text-lg font-medium">{successMsg}</div>
        ) : modalType === "login" ? (
          <LoginForm
            onSwitch={() => setModalType("register")}
            onSuccess={handleAuthSuccess}
          />
        ) : (
          <RegisterForm
            onSwitch={() => setModalType("login")}
            onSuccess={handleAuthSuccess}
          />
        )}
      </Modal>

      {/* Navegación principal */}
      <Navegacion />
    </header>
  );
};

export default Header;