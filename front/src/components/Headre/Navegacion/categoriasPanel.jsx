import React, { useState, useRef, useEffect } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { LiaAngleDownSolid, LiaAngleRightSolid } from "react-icons/lia";

const categories = [
  {
    name: "Linea blanca y climatizacion",
    
    subcategories: [
      { name: "Heladeras", url: "/categorias/electrodomesticos/heladeras" },
      { name: "Lavarropas", url: "/categorias/electrodomesticos/lavarropas" },
      { name: "Microondas", url: "/categorias/electrodomesticos/microondas" },
      { name: "Cafeteras", url: "/categorias/electrodomesticos/cafeteras" },
    ],
    
  },
  {
    name: "Hogar",
    url: "/categorias/hogar",
    subcategories: [
      { name: "Muebles", url: "/categorias/hogar/muebles" },
      { name: "Decoración", url: "/categorias/hogar/decoracion" },
      { name: "Iluminación", url: "/categorias/hogar/iluminacion" },
      { name: "Cocina", url: "/categorias/hogar/cocina" },
    ],
    
  },
  {
    name: "Tecnología",
    url: "/categorias/tecnologia",
    subcategories: [
      { name: "Smart TV", url: "/categorias/tecnologia/smart-tv" },
      { name: "Audio", url: "/categorias/tecnologia/audio" },
      { name: "Computadoras", url: "/categorias/tecnologia/computadoras" },
      { name: "Celulares", url: "/categorias/tecnologia/celulares" },
    ],
    
  },
];

const CategoryPanel = () => {
  const [open, setOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const menuRef = useRef(null);

  // Cierra el mega menú al hacer click fuera
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
        setHoveredCategory(null);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const redirect = (url) => {
    window.location.href = url;
    setOpen(false);
    setHoveredCategory(null);
  };

  return (
    <div className="relative" ref={menuRef} id="megamenu-root">
      <button
        className="flex items-center gap-2 px-4 py-2 font-[450] text-[16px] bg-white   transition"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <BiMenuAltLeft className="text-[20px] " />
        Categorías
        <LiaAngleDownSolid className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-[110%] z-50 flex bg-white border border-gray-200 rounded-xl shadow-2xl min-w-[650px] max-w-[98vw] animate-fadeIn"
        >
          {/* Columna de categorías */}
          <div className="w-56 bg-gray-50 rounded-l-xl py-4 px-2 border-r border-gray-200">
            {categories.map((cat, idx) => (
              <button
                key={cat.name}
                onMouseEnter={() => setHoveredCategory(idx)}
                onFocus={() => setHoveredCategory(idx)}
                onClick={() => redirect(cat.url)}
                className={`w-full text-left flex items-center px-3 py-2 rounded-lg transition font-medium ${
                  hoveredCategory === idx
                    ? "bg-blue-100 text-blue-700 shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                style={{ outline: "none" }}
                tabIndex={0}
              >
                <span>{cat.name}</span>
                <LiaAngleRightSolid className="ml-auto text-[16px]" />
              </button>
            ))}
          </div>

          {/* Columna de subcategorías y visual extra */}
          {hoveredCategory !== null && (
            <div className="flex-1 flex flex-row min-w-[300px] py-4 px-6 items-stretch">
              <div className="flex flex-col gap-1 flex-1">
                <div className="font-bold text-lg text-blue-700 mb-2 flex items-center gap-2">
                  {categories[hoveredCategory].name}
                </div>
                <div className="grid grid-cols-1 gap-0">
                  {categories[hoveredCategory].subcategories.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => redirect(sub.url)}
                      className="text-left px-2 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Imagen ilustrativa (opcional) */}
              {categories[hoveredCategory].image && (
                <div className="hidden md:flex items-center ml-5">
                  <img
                    src={categories[hoveredCategory].image}
                    alt={categories[hoveredCategory].name}
                    className="rounded-lg w-28 h-24 object-cover border border-gray-100 shadow"
                  />
                </div>
              )}
            </div>
          )}
          <style jsx="true">{`
            .animate-fadeIn {
              animation: fadeInMegaMenu 0.14s;
            }
            @keyframes fadeInMegaMenu {
              from { opacity:0; transform: translateY(10px);}
              to   { opacity:1; transform: translateY(0);}
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default CategoryPanel;