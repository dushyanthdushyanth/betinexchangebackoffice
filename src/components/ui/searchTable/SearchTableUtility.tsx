"use client";

import React, { ChangeEvent } from "react";
import { base64ToObj, objToBase64 } from "../../../utils/index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "@/redux/store";
import SearchTablePagination from "./SearchTablePagination";
import DropdownMenu from "@/components/ui/forms/DropdownMenu";
// import { replaceActiveLink } from "@/redux/slices/dashboardSlice";


const SearchTableUtility = ({ inputData, data,records }:any) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch =useDispatch()

  const query = base64ToObj(useSearchParams()!.get("q"));
  const handleChange=(val:any)=>{
  const q = objToBase64({ ...query,page:0, itemsPerPage: val});
  router.push(`${pathname}?q=${q}`);
  // dispatch(replaceActiveLink(`${pathname}?q=${q}`));
}
const options = [
        {value:"10", name:"10"},
        {value:"25", name:"25"},
        {value:"50", name:"50"},
        {value:"100", name:"100"},
        {value:"200", name:"200"},
        {value:"500", name:"500"},
]
  return (
    <div className="flex items-center z-10 justify-between mt-2 mb-2">
      <SearchTablePagination
        bodyData={inputData}
        data={data}
        itemsPerPage={query?.itemsPerPage ?? "10"}
        records={records}
      />
      <DropdownMenu
        value={query?.itemsPerPage ?? "10"}
        onChange={handleChange}
        options={options}
        isBottom={true}
      />
    </div>
  );
};

export default SearchTableUtility;
