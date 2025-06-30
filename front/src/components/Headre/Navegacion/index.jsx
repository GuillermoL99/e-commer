import React from "react";
import CategoryPanel from "./categoriasPanel"; // Usando tu nombre original

const Navegacion = () => (
  <nav className="py-1 w-full bg-white border-b border-gray-200">
    <div className=" w-full px-15 mx-auto flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-8">
      {/* Categorías */}
      <div className="w-full md:w-30 flex justify-center md:justify-start mb-2 md:mb-0">
        <CategoryPanel />
      </div>
      {/* Navegación Principal */}
      
    </div>
  </nav>
);

export default Navegacion;