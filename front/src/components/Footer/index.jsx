import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { GiWallet } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import {Button} from '@mui/material'
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () =>{
    return (
      <>
        <footer className="py-6 bg-white border-1 border-[rgba(0,0,0,0.1)] ">
        <div className="container">
          <div className="flex items-center justify-center gap-2 py-8 pb-8">
            <div className="col flex items-center justify-center flex-col  group w-[20%] ">
              <FaShippingFast className="text-[50px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#ff5252]  " />
              <h3 className="text-[18px] font-[600] mt-3 ">
                Envios a todo el pais
              </h3>
              <p className="text-[12px] font-[500] ">
                For all Orders over $100
              </p>
            </div>

            <div className="col flex items-center justify-center flex-col  group w-[20%]">
              <CiTimer className="text-[50px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#ff5252]  " />
              <h3 className="text-[18px] font-[600] mt-3 ">30 Days Returns</h3>
              <p className="text-[12px] font-[500] ">For an exchange Product</p>
            </div>

            <div className="col flex items-center justify-center flex-col  group w-[20%]">
              <GiWallet className="text-[50px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#ff5252]  " />
              <h3 className="text-[18px] font-[600] mt-3 ">Secured Payment</h3>
              <p className="text-[12px] font-[500] ">Payment Card Accepted</p>
            </div>

            <div className="col flex items-center justify-center flex-col  group w-[20%]">
              <BiSupport className="text-[50px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#ff5252]  " />
              <h3 className="text-[18px] font-[600] mt-3 ">Soporte 24/7</h3>
              <p className="text-[12px] font-[500] ">Contact us Anytime</p>
            </div>
          </div>
          <hr />

          <div className="footer flex  py-8">
            <div className="part1 w-[25%]  border-r border-[#ff5252] ">
              <h2 className="text-[18px] font-[600] mb-4 ">Contact us</h2>

              <p className="text-[13px] font-[400] pb-4 ">
                Classyshop - Mega Super Store
                <br /> 
                507-Union Trade Centre France
              </p>
              <a href="https://www.google.com/?hl=es" className="link text-[13px] ">
              sales@yourcompany.com
              </a>

              <span className="text-[22px] font-[600] block w-full mt-3 mb-5">
                (+91) 9876-543-210
              </span>
            </div>

            <div className="part2 w-[40%] flex pl-8 ">

              <div className="part2_col1 w-[50%] ">
                <h2 className="text-[18px] font-[600] mb-4 ">Productos</h2>
                <ul>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Price drop</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">New products</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Best sales</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Contact us</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Sitemap</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Stores</a></li>
                </ul>
              </div>

              <div className="part2_col2 w-[50%] ">
                <h2 className="text-[18px] font-[600] mb-4 ">Our Company</h2>
                <ul>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Delivery</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Legal Notice</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Terms and conditions of use</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">About us</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Secure payment</a></li>
                  <li className="list-none text-[14px] w-full mb-1"><a href="/" className="link">Login</a></li>
                </ul>
              </div>
            </div>

            <div className="part2 w-[40%] flex pl-8 flex-col ">
              <h2 className="text-[18px] font-[600] mb-4 ">Subscribe to newsletter</h2>
              <p className="text-[13px] ">Subscribe to our latest newsletter to get news about special discounts.</p>

              <form action="" className="mt-5">
                <input type="text" className="w-full h-[45px] border outline-none pl-4 pr-4 mb-4 rounded-sm focus:border-[#000] " placeholder="Your Email Address" />

                <Button className="btn-org">SUSCRIBE</Button>
              </form>

            </div>
            
          </div>
        </div>
      </footer>


      <div className="bottomStip border-t border-[rgba(0,0,0,0.1)] py-3 bg-white">
        <div className="container flex items-center justify-between">
          <ul className=" flex items-center gap-3">
            <li className="list-none">
              
              <Link to="/" target="_blank" className="w-[35px]  h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all">
              <FaWhatsapp className="text-[15px] group-hover:text-white "/>
              </Link>
              
            </li>
            <li className="list-none">
              
              <Link to="/" target="_blank" className="w-[35px]  h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all">
              <CiFacebook className="text-[15px] group-hover:text-white "/>
              </Link>
              
            </li>
            <li className="list-none">
              
              <Link to="/" target="_blank" className="w-[35px]  h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group transition-all hover:bg-[#ff5252] ">
              <CiInstagram className="text-[15px] group-hover:text-white "/>
              </Link>
              
            </li>
            
          </ul>

          <p className="text-[13px] text-center mb-0 ">© 2024 - Ecommerce Template</p>

          <div className="flex items-center gap-3">
            <img src="../../../public/visa.png" alt="" />
            <img src="../../../public/master_card.png" alt="" />
          </div>
        </div>
      </div>
      </>
    );
}

export default Footer;