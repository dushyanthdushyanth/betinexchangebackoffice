"use client";

import { base64ToObj, objToBase64 } from "../../../utils/index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { replaceActiveLink } from "@/redux/slices/dashboardSlice";
import { useDispatch } from "@/redux/store";

const SearchTablePagination = ({
  bodyData,
  data,
  itemsPerPage,
  records
}: {
  bodyData?: any;
  data?: any;
  itemsPerPage?: any;
  records:any
}) => {
  const searchParams = base64ToObj(useSearchParams()!.get("q"));
  const count = Math.ceil((data?.totalRecords || records) / Number(itemsPerPage));
  const dispatch =useDispatch()
  const pathname = usePathname();
  const router = useRouter();

  // function handleChange(_: any, page: number) {
  //   // query["page"] = page - 1;
  //   const q = objToBase64({ ...searchParams, page: page - 1 });
  //   router.push(`${pathname}?q=${q}`);
  //   dispatch(replaceActiveLink(`${pathname}?q=${q}`));
  // }

  return (
    <Stack spacing={2}>
      <Pagination
        page={searchParams?.page ? Number(searchParams?.page) + 1 : 1}
        count={count}
        // variant="outlined"
        // shape="rounded"
        // onChange={handleChange}
      />
    </Stack>
  );
};

export default SearchTablePagination;
