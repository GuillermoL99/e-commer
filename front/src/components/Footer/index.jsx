import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { GiWallet } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";

const Footer = () =>{
    return (
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

          <div className="footer flex items-center py-8">
            <div className="part1 w-[30%]">
              <h2 className="text-[20px] font-[600] ">Contact us</h2>

              <p className="text-[20px] font-[600] pb-4 ">
                Classyshop - Mega Super Store 507-Union Trade Centre France
              </p>
              <a href="https://www.google.com/?hl=es">
              sales@yourcompany.com
              </a>

              <span className="text-[22px] font-[600] block w-full mt-3">
                (+91) 9876-543-210
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;