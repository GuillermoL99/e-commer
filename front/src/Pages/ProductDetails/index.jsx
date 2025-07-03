import React, { useState } from 'react';
import ProductZoom from '../../components/ProductZoom';
import ProductSlider from '../../components/ProductsSlider';
import ProductDetailComponent from '../../components/ProductDetailComponent';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';




const ProductDetails = () => {
    

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    

    return (
      <>
        <div className="py-5">
          <div className="container">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/">
                Linea blanca y climatizacion
              </Link>
              <Link underline="hover" color="inherit" href="/">
                producto
              </Link>
            </Breadcrumbs>
          </div>
        </div>

        <section className="bg-white py-5">

          <div className="container flex gap-8">
            <div className="productZoomContainer w-[40%]  ">
              <ProductZoom />
            </div>

            <div className="productContent w-[60%] ">
              <ProductDetailComponent/>
            </div>
          </div>

          {/* Sección de información detallada */}
          <section className="bg-gray-100 py-5">
          <div className="container">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    sx={{
                      '& .MuiTab-root': {
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '16px'
                      }
                    }}
                  >
                    <Tab label="Descripción" />
                    <Tab label="Especificaciones" />
                    
                   
                  </Tabs>
                </Box>

                <div className="py-6">
                {tabValue === 0 && (
                  <div className="max-w-4xl">
                    <h3 className="text-[20px] font-[600] mb-4">Descripción del Producto</h3>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        Esta camisa casual opaca para hombres está confeccionada con materiales de alta calidad 
                        que garantizan comodidad y durabilidad. Su diseño versátil la hace perfecta para 
                        ocasiones casuales y semi-formales.
                      </p>
                      <p>
                        Fabricada con algodón 100% premium, esta camisa ofrece transpirabilidad excepcional 
                        y un ajuste cómodo que se adapta a diferentes tipos de cuerpo. El acabado de alta 
                        calidad asegura que mantenga su forma y color después de múltiples lavados.
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Material: 100% Algodón Premium</li>
                        <li>Ajuste: Regular Fit</li>
                        <li>Cuello: Cuello clásico con botones</li>
                        <li>Cuidado: Lavable en máquina</li>
                        <li>Origen: Fabricado con estándares internacionales</li>
                      </ul>
                    </div>
                  </div>
                )}

                {tabValue === 1 && (
                  <div className="max-w-4xl">
                    <h3 className="text-[20px] font-[600] mb-4">Especificaciones Técnicas</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <table className="w-full border-collapse">
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 font-[600]">Material:</td>
                              <td className="py-2">100% Algodón</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-[600]">Peso:</td>
                              <td className="py-2">180 GSM</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-[600]">Ajuste:</td>
                              <td className="py-2">Regular Fit</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-[600]">Tipo de cuello:</td>
                              <td className="py-2">Clásico</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <table className="w-full border-collapse">
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 font-[600]">Manga:</td>
                              <td className="py-2">Manga larga</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-[600]">Temporada:</td>
                              <td className="py-2">Todo el año</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-[600]">Cuidado:</td>
                              <td className="py-2">Lavable en máquina</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-[600]">País de origen:</td>
                              <td className="py-2">India</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Box>
            </div>
          </div>
          </section>

           {/* Sección de productos relacionados */}     
          <div className='container pt-6 overflow-hidden'>
                <h2 className="text-[20px] font-[600] pb-4">Productos relacionados</h2>
                <div className="mx-[-15px]">
                  <ProductSlider items={5} />
                </div>
          </div>
        </section>

        
      </>
    );
};

export default ProductDetails;