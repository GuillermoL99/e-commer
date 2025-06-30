import React from "react";
import Button from '@mui/material/Button';
import { MdOutlineManageSearch } from "react-icons/md";

const Search = () => {
  return (
    <div className="w-full bg-[#e5e5e5] rounded-[5px] relative px-2 py-1 flex items-center">
      <input
        type="text"
        placeholder="Busca tus productos..."
        className="w-full h-9 md:h-10 bg-inherit p-2 text-[15px] rounded-[5px] focus:outline-none pr-12"
      />
      <Button
        className="!absolute right-3 top-1/2 -translate-y-1/2 z-10 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black flex items-center justify-center"
      >
        <MdOutlineManageSearch className="text-black text-[20px]" />
      </Button>
    </div>
  );
};

export default Search;