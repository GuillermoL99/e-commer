const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-colors bg-black/30 backdrop-blur-sm animate-fadeIn">
      {/* Contenedor animado */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 flex flex-col animate-slideDown">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition-colors"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>
        {children}
      </div>
      <style jsx="true">{`
        .animate-fadeIn {
          animation: fadeInBg 0.2s;
        }
        .animate-slideDown {
          animation: slideDownModal 0.3s cubic-bezier(0.45,0.05,0.55,0.95);
        }
        @keyframes fadeInBg {
          from { background-color: rgba(0,0,0,0); }
          to   { background-color: rgba(0,0,0,0.3);}
        }
        @keyframes slideDownModal {
          from { opacity:0; transform: translateY(-30px) scale(0.97);}
          to   { opacity:1; transform: translateY(0) scale(1);}
        }
      `}</style>
    </div>
  );
};

export default Modal;