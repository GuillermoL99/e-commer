import React from "react"
import HomeSlider from "../../components/HomeSlider"
import HomeCardSlider from "../../components/HomeCardSlider"
import ProductSlider from "../../components/ProductsSlider";
import HomeBannerV2 from "../../components/HomeSliderV2";
import BannerBox from "../../components/BannerBox";



import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



const Home = () =>{

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
      <>
        <HomeSlider />
        
      
        <HomeCardSlider />
        <br/>


        <section className=" py-4 bg-white">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="leftSec">
                <h2 className="text-[20px] font-[600] ">Productos Populares</h2>
                <p className="text-[15px] font-[300] ">
                  Do not miss the current offers util the end ofMarch.
                </p>
              </div>

              <div className="rightSec w-[60%] ">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Linea blanca y climatizacion" />
                  <Tab label="Electrodomésticos de Cocina y Hogar" />
                  <Tab label="Muebles y Equipamiento para el Hogar" />
                  <Tab label="Descanso y Dormitorio" />
                  <Tab label="Tecnología y Electrónica" />
                  <Tab label="Herramientas y Equipos Especiales" />
                  <Tab label="Vehículos y Movilidad" />
                  <Tab label="Camping y Ocio" />
                  <Tab label="Cuidado Personal y Salud" />
                </Tabs>
              </div>
            </div>

            <ProductSlider items={5} />
            
          </div>
        </section>

         <section className="py-6 bg-white">
          <div className="container flex items-start gap-6">
            <div className="part1 w-[70%]">
              <HomeBannerV2/>
            </div>

            <div className="part2 w-[30%] flex flex-col gap-4">
              <BannerBox info="left" image={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"} />
              <BannerBox info="right" image={"https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"}/>
            </div>
            
          </div>
        </section>

        <section className="py-4">
          <div className='container pt-6 overflow-hidden'>
                <h2 className="text-[20px] font-[600] pb-4">Ultimos Productos</h2>
                <div className="mx-[-15px]">
                  <ProductSlider items={5} />
                </div>
          </div>
          
        </section>
         
        
        <section className="py-4">
          <div className='container pt-6 overflow-hidden'>
                <h2 className="text-[20px] font-[600] pb-4">Productos Destacados</h2>
                <div className="mx-[-15px]">
                  <ProductSlider items={5} />
                </div>
          </div>
        </section>
        <br /> 
        
      </>
    );
}

export default Home