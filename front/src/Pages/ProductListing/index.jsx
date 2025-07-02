import React from 'react';

import ProductItem from '../../components/ProductItems';
import SideBar from '../../components/SideBar';
import ProductItemListView from '../../components/ProductItemListView';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { BsGridFill } from "react-icons/bs";
import { GoProjectRoadmap } from "react-icons/go";
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';


const ProductListing = () => {


    const [itemView, setItemView] = React.useState('lgrid'); // 'list' or 'grid'
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
  };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
      <section className="py-5 pb-0">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/">
              Linea blanca y climatizacion
            </Link>
          </Breadcrumbs>
        </div>

        <div className="bg-white p-4 mt-4">
          <div className="container flex gap-6">
            <div className="sidebarWrapper w-[25%] h-full bg-white">
              <SideBar />
            </div>

            <div className="rightContent w-[75%] py-3">
              <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between ">
                <div className="col1 flex items-center ItemViewActions ">
                  <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${itemView === 'list' && 'active'}`}
                  onClick={() => setItemView('list')}>
                    <GoProjectRoadmap className="text-[rgba(0,0,0,0.7)] " />
                  </Button>
                  <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${itemView === 'grid' && 'active'}`}
                  onClick={() => setItemView('grid')}>
                    <BsGridFill className="text-[rgba(0,0,0,0.7)] " />
                  </Button>
                  <span className="text-[14px] font-[500] pl-3 ">
                    Hay 27 productos
                  </span>
                </div>

                <div className="col2  ml-auto flex items-center justify-end gap-3 pr-4">
                  <span className="text-[14px] font-[500] pl-3 ">
                    Buscar por :
                  </span>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className='!bg-white !text-[#000] !text-[14px]  !capitalize !border-1 !border-[#000] '
                  >
                    Dashboard
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose} className=' !text-[#000] !text-[13px]  !capitalize   ' >Profile</MenuItem>
                    <MenuItem onClick={handleClose} className=' !text-[#000] !text-[13px]  !capitalize   ' >My account</MenuItem>
                    <MenuItem onClick={handleClose} className=' !text-[#000] !text-[13px]  !capitalize   ' >Logout</MenuItem>
                  </Menu>
                </div>
              </div>

              <div className={`grid ${itemView === 'grid' ? 'grid-cols-3 md:grid-cols-3 ' : 'grid-cols-1 md:grid-cols-1'} gap-4`}>
                {
                    itemView === 'grid' ? (
                      <>
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                      </>
                    ) : 
                    <>
                        <ProductItemListView />
                        <ProductItemListView />
                        <ProductItemListView />
                        <ProductItemListView />
                        <ProductItemListView />
                        <ProductItemListView />
                        <ProductItemListView />
                        <ProductItemListView />
                      </>
                }
                
              </div>


              <div className='flex items-center justify-center mt-10'>
                <Pagination count={10} showFirstButton showLastButton />
              </div>
            </div>
          </div>
          
        </div>
      </section>
    );
};

export default ProductListing;