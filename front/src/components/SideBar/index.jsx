import React from 'react';
import { useState } from 'react';

import './estilos.css';
import 'react-range-slider-input/dist/style.css';


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Collapse} from 'react-collapse';
import { LiaAngleDownSolid } from "react-icons/lia";
import { FaAngleUp } from "react-icons/fa6";
import { Button } from '@mui/material';
import RangeSlider from 'react-range-slider-input';


const SideBar = () => {

    const [isOpenCategotyFilter, SetIsOpenCategoryFilter] = useState(false);
    const [isOpenDispoFilter, SetIsOpenDispoFilter] = useState(false);

    return (
        <aside className="sidebar py-3">
            <div className='box '>
                 <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Comprar por categoría
                    <Button onClick={()=>SetIsOpenCategoryFilter(!isOpenCategotyFilter)} className='text-[#000] !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto '>
                        {isOpenCategotyFilter=== true ?
                        <FaAngleUp className='text-[20px]'/> :
                        <LiaAngleDownSolid className='text-[20px]'/>}
                    </Button>
                 </h3>
                 <Collapse isOpened={isOpenCategotyFilter}>
                 <div className='scroll  relative  '>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Linea blanca y climatizacion" className='w-full '/>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Electrodomésticos Cocina-Hogar" className='w-full '/>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Muebles y Equipamiento - Hogar" className='w-full'/>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Descanso y Dormitorio" className='w-full'/>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Tecnología y Electrónica" className='w-full'/>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Herramientas y Equipos Especiales"className='w-full' />
                    <FormControlLabel control={<Checkbox size="small"/>} label="Vehículos y Movilidad"className='w-full' />
                    <FormControlLabel control={<Checkbox size="small"/>} label="Camping y Ocio" className='w-full'/>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Cuidado Personal y Salud"className='w-full' />
                 </div>
                 </Collapse>
            </div>

            <div className='box mt-3'>
                 <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Disponibilidad
                    <Button onClick={()=>SetIsOpenDispoFilter(!isOpenDispoFilter)} className='text-[#000] !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto '>
                        {isOpenDispoFilter=== true ?
                        <FaAngleUp className='text-[20px]'/> :
                        <LiaAngleDownSolid className='text-[20px]'/>}
                    </Button>
                 </h3>
                 <Collapse isOpened={isOpenDispoFilter}>
                 <div className='scroll  relative  '>
                    <FormControlLabel control={<Checkbox size="small"/>}
                     label="Dispomible" className='w-full '/>
                    <FormControlLabel control={<Checkbox size="small"/>}
                     label="En stock" className='w-full '/>
                     <FormControlLabel control={<Checkbox size="small"/>}
                     label="No disponible" className='w-full '/>
                 </div>
                 </Collapse>
            </div>

            <div className='box mt-3'>
                <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>
                    Filtrar por Precio
                </h3>

                <RangeSlider/>
                <div className='flex pt-4 pb-2 priceRange'>
                    <span className='text-[14px]'>
                        <strong className='text-dark'>{1000}$</strong>
                    </span>
                    <span className='ml-auto text-[14px]'>
                        <strong className='text-dark'>{10000}$</strong>
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;