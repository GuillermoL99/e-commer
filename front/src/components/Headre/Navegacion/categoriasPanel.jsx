// React y dependencias externas
import React, { useState, useRef, useEffect } from "react"

// Íconos
import { BiMenuAltLeft } from "react-icons/bi"
import { LiaAngleDownSolid, LiaAngleRightSolid } from "react-icons/lia"

const categories = [
  {
    name: "Linea blanca y climatizacion",
    url: "/product-listing",
    subcategories: [
      { name: "Heladeras", url: "/categorias/electrodomesticos/heladeras" },
      { name: "Lavarropas", url: "/categorias/electrodomesticos/lavarropas" },
      { name: "Microondas", url: "/categorias/electrodomesticos/microondas" },
      { name: "Cafeteras", url: "/categorias/electrodomesticos/cafeteras" },
    ],
    
  },
  {
    name: "Electrodomésticos de Cocina y Hogar",
    
    subcategories: [
      { name: "Cocina", items: ["Procesadoras", "Batidoras", "Mixers", "Sandwicheras"] },
      { name: "Limpieza", items: ["Aspiradoras", "Planchas"] }
    ],
    
  },
  {
    name: "Muebles y Equipamiento para el Hogar",
   
    subcategories: [
      { name: "Muebles", items: ["Sillas", "Mesas", "Estanterías"] },
      { name: "Organización", items: ["Roperos", "Zapateros"] }
    ],
    
  },
  {
    name: "Descanso y Dormitorio",
    
    subcategories: [
      { name: "Dormitorio", items: ["Colchones", "Almohadas", "Sábanas"] },
      { name: "Descanso", items: ["Sommier", "Respaldo"] }
    ]
  },
  {
    name: "Tecnología y Electrónica",
   
    subcategories: [
      { name: "Dispositivos", items: ["Celulares", "Tablets", "Laptops"] },
      { name: "Accesorios", items: ["Auriculares", "Cargadores"] }
    ]
  },
  {
    name: "Herramientas y Equipos Especiales",
    
    subcategories: [
      { name: "Herramientas eléctricas", items: ["Taladros", "Amoladoras"] },
      { name: "Equipos", items: ["Soldadoras", "Compresores"] }
    ]
  },
  {
    name: "Vehículos y Movilidad",
    
    subcategories: [
      { name: "Movilidad personal", items: ["Bicicletas", "Monopatines"] },
      { name: "Vehículos", items: ["Motos", "Autos"] }
    ]
  },
  {
    name: "Camping y Ocio",
    
    subcategories: [
      { name: "Camping", items: ["Carpas", "Linternas"] },
      { name: "Ocio", items: ["Juegos", "Deportes"] }
    ]
  },
  {
    name: "Cuidado Personal y Salud",
    
    subcategories: [
      { name: "Cuidado personal", items: ["Secadores", "Afeitadoras"] },
      { name: "Salud", items: ["Termómetros", "Oxímetros"] }
    ]
  }
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
        <LiaAngleDownSolid className={` ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
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
                    ? "bg-blue-100 text-[#ff5252]  shadow"
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
                <div className="font-bold text-lg text-[#ff5252] mb-2 flex items-center gap-2">
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