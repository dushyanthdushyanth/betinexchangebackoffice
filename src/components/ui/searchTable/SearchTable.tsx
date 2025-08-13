"use client";

import React, { useState, useEffect, useRef, JSX } from "react";
import { TableHeaders } from "../../../../types";
import {
  divisibleWithTwoDecimals,
  formatNumberWithCommas,
  isBrowser,
} from "../../../utils/index";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";
import SearchTableUtility from "./SearchTableUtility";
import { Tooltip } from "@mui/material";
import ColumnPicker from "./ColumnPicker";
import DropdownMenu from "@/components/ui/forms/DropdownMenu";
import moment from "moment-timezone";
import Switch from "@mui/material/Switch";
// import Image from "next/image";
//  import { RootState, useSelector } from "@/redux/store";
import CopyImage from "../icons/CopyImage";
// import downIcon from "../icons/downloadwhite.png";
// import viewIcon from "../icons/viewIcon.png";
// import { MasterBankList } from "@/redux/slices/cookieSlice";

interface Params {
  key: string;
  value?: any;
  data?: any;
}

type Status = 'ACTIVE' | 'CONFIRMED' | 'FAILED' | 'REVIEW_ORDER';

interface StatusStyles {
  bg: string;
  dot: string;
  text: string;
  label: string;
}

// Utility Functions
const getStatusStyles = (status: string) => {
  const styles = {
    ACTIVE: { bg: "#ECFDF3", dot: "#12B76A", text: "#027A48", label: "Processing" },
    CONFIRMED: { bg: "#F8F9FC", dot: "#4A569C", text: "#363F72", label: "Completed" },
    FAILED: { bg: "#FFF4EDED", dot: "#D03D3D", text: "#B93815", label: "Failed" },
    REVIEW_ORDER: { bg: "#f5eee9", dot: "#FF6700", text: "#FF6700", label: "Review" },
    COMPLETED: { bg: "#F8F9FC", dot: "#4A569C", text: "#363F72", label: "Completed" },
  };
  return (
    styles[status as keyof typeof styles]
  );
};

const getButtonStyles = (status: string) => {
  const styles = {
    CONFIRMED: { bg: "#D0F9DE", text: "green", label: "SUCCESS" },
    COMPLETED: { bg: "#D0F9DE", text: "green", label: "SUCCESS" },
    ACTIVE: { bg: "#B7E2F0", text: "#000", label: "ACTIVE" },
    FAILED: { bg: "#FDE3E1", text: "red", label: "FAILED" },
    REVIEW_ORDER: { bg: "#ccc", text: "#000", label: "REVIEW_ORDER" },
  };
  return (
    styles[status as keyof typeof styles] || { bg: "", text: "", label: status }
  );
};

const formatDateTime = (value: string, type: string) => {
  if (!value) return "";
  const momentObj = moment.utc(value);
  switch (type) {
    case "DATE":
      return momentObj.format("DD/MM/YYYY");
    case "TIME":
      return momentObj.tz("Asia/Kolkata").format("YYYY-MM-DD, hh:mm:ss A");
    case "DATETIME":
      return momentObj.format("DD/MM/YYYY, hh:mm:ss A");
    default:
      return value;
  }
};

const getColumnClassNames = (
  col: TableHeaders,
  isVisibleColumnPicker: boolean,
  isVisibleColumnPickerLeft: boolean
) => {
  const baseClasses = "text-start px-[1rem] py-[0.5rem] h-[4.5rem] font-inter text-[0.875rem]";
  return `${baseClasses}`;
};

const CopyableCell = ({
  value,
  rowIndex,
  copiedKey,
  setCopiedKey,
  setRowDataIndex,
  type
}: any) => {
  const uniqueKey = `${value}-${rowIndex}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopiedKey(uniqueKey);
    setRowDataIndex(rowIndex);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="relative flex items-center gap-1">
      <p className={`${type === "amount" ? "text-primary" : "#475467"} text-[0.875rem] font-medium`}>{value}</p>
      <div className="cursor-pointer" onClick={handleCopy}>
        <CopyImage />
      </div>
      {copiedKey === uniqueKey && <span className="absolute -top-4 -right-3 text-xs text-green-500">Copied!</span>}
    </div>
  );
};

// const bData = isBrowser() && localStorage.getItem("bankNameList")
//   console.log("fsfdfdddsfs",bData)
//   const parsedBnkData = JSON.parse(bData)

//   const ExtractBankImg = (bankName:any) => {
//     parsedBnkData?.find((item:any)=> item?.bankCode === bankName)
//   }
//   console.log("fdfdsfsdf",parsedBnkData)


const SearchTable = ({
  header,
  body,
  onClick,
  onToggleChange,
  onSelectAllData,
  onChange,
  headerName,
  showImage,
  updateKyc,
  records,
}: {
  header?: TableHeaders[];
  body?: any;
  onClick?: (params: Params) => void;
  onToggleChange?: (params: Params) => void;
  onSelectAllData?: (data: any, checked: boolean) => void;
  onChange?: (params: Params) => void;
  headerName?: string;
  showImage?: any;
  updateKyc?: any;
  records?: any;
}) => {
  const pathname = usePathname();
  const TABLE_UTILITY_REQUIRED = !!body?.data?.totalRecords || records;
  const loadData = (body: { data: any }) => body?.data || body;
  const [tableData, setTableData] = useState(loadData(body) ?? []);
  const [headerState, setHeaderState] = useState(header);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [isVisibleColumnPicker, setIsVisibleColumnPicker] = useState(false);
  const [isVisibleColumnPickerLeft, setIsVisibleColumnPickerLeft] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [rowDataIndex, setRowDataIndex] = useState<number>(0);
  // const { permissions, masterBankList } = useSelector((state: RootState) => state.cookieReducer);
  const tableRef = useRef(null);

  useEffect(() => {
    const newData = loadData(body);
    setTableData(newData);
  }, [body]);

  const requestSort = (key: any) => {
    setSortConfig((prev) => {
      const direction = prev.key === key && prev.direction === "ascending" ? "descending" : "ascending";
      const sortedData = [...loadData(tableData)].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
      setTableData(sortedData);
      return { key, direction };
    });
  };


  return (
    <div className="w-full h-max rounded-xl pt-3">
      <div
        ref={tableRef}
        className="w-full tablecontainer overflow-y-auto overflow-x-scroll pb-2.5 xl:pb-1 rounded-xl shadow-[0px_0px_10px_0px_#ccc]"
      >
        <table className="w-full text-sm text-center relative rounded-xl border-collapse">
          <SearchTableHeader
            header={headerState}
            setHeader={setHeaderState}
            requestSort={requestSort}
            isVisibleColumnPicker={isVisibleColumnPicker}
            setIsVisibleColumnPicker={setIsVisibleColumnPicker}
            setIsVisibleColumnPickerLeft={setIsVisibleColumnPickerLeft}
            isVisibleColumnPickerLeft={isVisibleColumnPickerLeft}
            tableRef={tableRef}
            // permissions={permissions}
            body={body?.data}
            onSelectAllData={onSelectAllData}
          />
          <tbody>
            <SearchTableBody
              rowDataIndex={rowDataIndex}
              setRowDataIndex={setRowDataIndex}
              copiedKey={copiedKey}
              setCopiedKey={setCopiedKey}
              onClick={onClick}
              onToggleChange={onToggleChange}
              data={tableData}
              header={headerState}
              onChange={onChange}
              isVisibleColumnPicker={isVisibleColumnPicker}
              setIsVisibleColumnPickerLeft={setIsVisibleColumnPickerLeft}
              isVisibleColumnPickerLeft={isVisibleColumnPickerLeft}
              tableRef={tableRef}
              // permissions={permissions}
              // masterBankList={masterBankList}
              pathname={pathname}
            />
          </tbody>
        </table>
      </div>
      {TABLE_UTILITY_REQUIRED && (
        <SearchTableUtility inputData={{}} data={body?.data} records={records} />
      )}
    </div>
  );
};

const SearchTableHeader = ({
  header,
  tableRef,
  setHeader,
  requestSort,
  setIsVisibleColumnPicker,
  isVisibleColumnPicker,
  setIsVisibleColumnPickerLeft,
  isVisibleColumnPickerLeft,
  // permissions = [],
  body,
  onSelectAllData,
}: any) => {
  const [sortKey, setSortKey] = useState("");
  const [ascending, setAscending] = useState(false);
  const divRef = useRef(null);
  const IndexZero = useRef<any>(null);
  const IndexOne = useRef<any>(null);
  const debounceTimeoutRef = useRef<any>(null);

  const onSortTable = (key: any) => {
    setAscending(!ascending);
    setSortKey((prev) => (prev === key ? "" : key));
    requestSort(key);
  };

  const debouncedHandleScroll = () => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      const scrollLeft = tableRef.current.scrollLeft;
      if (IndexZero.current && IndexOne.current) {
        const div1Rect = IndexZero.current.getBoundingClientRect();
        const div2Rect = IndexOne.current.getBoundingClientRect();
        setIsVisibleColumnPickerLeft(div2Rect.left < div1Rect.right);
      }
    }, 100);
  };

  useEffect(() => {
    const container = tableRef.current;
    container.addEventListener("scroll", debouncedHandleScroll);
    return () => { 
      container.removeEventListener("scroll", debouncedHandleScroll);
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisibleColumnPicker(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );
    if (divRef.current) observer.observe(divRef.current);
    return () => {
      if (divRef.current) observer.unobserve(divRef.current);
    };
  }, []);

  const handleSelectAlll = async (e:any,data:any) =>{
    onSelectAllData(data, e.target.checked)
  }

  return (
    <thead className="w-full h-[44px] font-inter font-medium text-[0.75rem] text-[#475467] bg-[#F9FAFB] rounded-t-xl sticky top-0 z-10">
      <tr className="rounded-lg bg-[#F9FAFB]">
        {header?.map((head: TableHeaders, i: number) =>
          head?.visible ? (
            <th
              className={`h-[100%] px-[1rem] py-[0.5rem] text-xs xl:text-sm font-medium first:rounded-tl-xl last:rounded-tr-xl
                ${(head.name === "Order Number" || head.name === "Order Id" ) ? "flex items-center h-[100%] mt-1" : ""}
                ${head.name === "Order Id" && isVisibleColumnPickerLeft ? "bg-white [box-shadow:-4px_0_4px_-4px_gray_inset]" : ""} ${(head?.type === "ACCOUNT" || head?.type === "STATUS_BUTTON") ? "text-center" : "text-start"}`}
              key={i}
              onClick={head?.sort ? () => onSortTable(head?.key) : undefined}
              ref={i === 0 ? IndexZero : i === 1 ? IndexOne : null}
            >
              <div className="flex flex-start">
              {
                head?.key === "Agent_Toggle" && <input type="checkbox" onClick={(e)=>handleSelectAlll(e,body?.data)} className="mr-2" />
              }
              <p className="text-[0.75rem] font-semibold xsm:text-base w-max">{head?.name}</p>
              {head?.sort && (
                <span className="flex items-center justify-center h-[100%]">
                  {ascending ? (
                    <HiOutlineArrowNarrowUp className="inline-block ml-2 mt-2" />
                  ) : (
                    <HiOutlineArrowNarrowDown className="inline-block ml-2 mt-0" />
                  )}
                </span>
              )}
              </div>
            </th>
          ) : null
        )}
        <th className={`py-2 capitalize bg-table-header-color `} ref={divRef}>
          <ColumnPicker header={header} setHeader={setHeader} />
        </th>
      </tr>
    </thead>
  );
};

const SearchTableBody = ({
  copiedKey,
  setCopiedKey,
  data,
  header,
  onClick,
  onToggleChange,
  onChange,
  isVisibleColumnPicker,
  isVisibleColumnPickerLeft,
  // permissions,
  rowDataIndex,
  setRowDataIndex,
  // masterBankList,
  pathname,
}: any) => {
  const resData = data?.data ?? data;

  return (
    <>
      {Array.isArray(resData) && resData.length ? (
        resData.map((rowData: any, i: number) => (
          <tr
            key={i}
            className={`text-[0.7rem] h-14 xl:text-xs text-[#656E7F] border-b border-stroke dark:border-strokedark text-sm font-inter font-medium border-t border-[#EAECF0] ${
              i % 2 !== 0 ? "bg-[#fff]" : "bg-[#fff]"
            }`}
          >
            {loadTableColumns(
              rowData,
              header,
              onClick,
              onToggleChange,
              onChange,
              isVisibleColumnPicker,
              isVisibleColumnPickerLeft,
              // permissions,
              copiedKey,
              setCopiedKey,
              i,
              rowDataIndex,
              setRowDataIndex,
              // masterBankList,
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={header.length}
            className="mt-6 ml-2 font-semibold mb-6 text-sm text-center py-4"
          >
            No Results Found
          </td>
        </tr>
      )}
    </>
  );
};

const loadTableColumns = (
  data: any = {},
  header: TableHeaders[],
  onClick: (params: Params) => void,
  onToggleChange: any,
  onChange: (params: { key: string; value: any; data: any }) => void,
  isVisibleColumnPicker: boolean,
  isVisibleColumnPickerLeft: boolean,
  // permissions: string[] = [],
  copiedKey: string | null,
  setCopiedKey: React.Dispatch<React.SetStateAction<string | null>>,
  rowIndex: number,
  rowDataIndex: number,
  setRowDataIndex: React.Dispatch<React.SetStateAction<number>>,
  // masterBankList: MasterBankList[] = [],
) => {
  const status = data?.status || data?.keyStatus;
  // const masterBankListMap = new Map<string, MasterBankList>(
  //   masterBankList.map((item:any) => [item.bankCode, item])
  // );
  const columnRenderers: {
    [key: string]: (col: TableHeaders, index: number) => JSX.Element | null;
  } = {
    CLICKABLE: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={`${getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}`}
          key={`${col.key}-${index}`}
        >
          <span
            className="cursor-pointer underline"
            onClick={() => onClick({ key: col.key, data })}
          >
            {col.key in data ? data[col.key] : "-"}
          </span>
        </td>
      ) : null;
    },
    CHECKBOX: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={`${getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)} ${
            col.name === "Utr Matched" || col.name === "Is Manual" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          key={`${col.key}-${index}`}
        >
          <input
            type="checkbox"
            checked={
              col.key in data
                ? data[col.key] === 0
                  ? false
                  : data[col.key] === 1
                  ? true
                  : data[col.key]
                : false
            }
            onChange={
              col.name === "Utr Matched" || col.name === "Is Manual"
                ? (e) => e.preventDefault()
                : () => onClick({ key: col.key, data })
            }
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
              col.name === "Utr Matched" || col.name === "Is Manual" ? "pointer-events-none" : ""
            }`}
          />
        </td>
      ) : null;
    },
    DROPDOWN: (col, index) => {
      if (!col.key) return null;
      const options = (col.dropdownOptions || []).map((opt: { name: any; value: any }) => ({
        name: opt.name,
        value: opt.value,
      }));
      options.unshift({ name: "Select", value: "" });
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          <DropdownMenu
            value={status}
            onChange={(val: any) => onChange({ key: col.key, value: val, data })}
            options={options}
            isWidthFull
            isTableDropDown
          />
        </td>
      ) : null;
    },
    TOGGLE_BUTTON: (col, index) => {
      if (!col.key) return null;
        return col.visible ? (
        <td key={`${col.key}-${index}`}>
                
                  <div
                  className="flex flex-row  items-center   p-[4px] "
                >
                  <Switch
                    color="primary"
                    checked={data?.agentId > 0 || data?.enableToggleButton}
                    onChange={() =>{
                      onToggleChange({ key: col.key, data })  
                    }
                    }
                    disabled={data?.agentId > 0}
                  />
                </div>
              </td>
      ) : null;
    },
    BUTTON: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {col.buttonTitle === "Action" && data.orderStatus === "CONFIRMED" ? null : (
            <button
              className="bg-[#fff] w-[6.8125rem] text-start whitespace-nowrap h-[2rem] py-[0.3125rem] text-[0.875rem] text-[#7F56D9] font-inter font-semibold"
              onClick={() => onClick({ key: col.key, data })}
            >
              {col.buttonTitle}
            </button>
          )}
        </td>
      ) : null;
    },
    MANUAL_BUTTON: (col, index) => {
      if (!col.key) return null;
        return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
         
            <Button
              className="bg-[#101828] text-white py-[0.3rem] border-none disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed"
              color="primary"
              onClick={() => onClick({ key: col.key, data })}
            >
              {col.buttonTitle}
            </Button>
          
        </td>
      ) : null;
    },
    ORDER_BUTTON: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          <div className="flex gap-2">
            <button
              className="bg-[#4AC5B3] w-[5.5625rem] h-[2rem] text-white py-[0.3125rem] text-[0.875rem] px-4 rounded border-none disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed uppercase"
              onClick={() => onClick({ key: col.key, data })}
            >
              {col.buttonTitle}
            </button>
            <button
              className="bg-[#fff] w-[5.8125rem] h-[2rem] border border-[#E5E6EB] py-[0.3125rem] text-[0.875rem] px-4 rounded disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed"
              onClick={() => onClick({ key: col.key, data })}
            >
              Mark Fail
            </button>
          </div>
        </td>
      ) : null;
    },
    STATUS_BUTTON: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          <div className="flex flex-row items-center p-[4px]">
            <Switch
              color="primary"
              checked={data?.status === "ACTIVE"}
              onChange={() => onClick({ key: col.key, data })}
            />
            <p
              className={`font-inter text-[0.775rem] font-semibold px-3 py-1 items-start rounded-full ${
                data?.status === "ACTIVE"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : data?.status === "INACTIVE"
                  ? "bg-[#FDE3E1] text-[#B93815]"
                  : "bg-[#f5eee9] text-[#FF6700]"
              }`}
            >
              {data?.status}
            </p>
          </div>
        </td>
      ) : null;
    },
    DATE: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {col.key in data ? formatDateTime(data[col.key], "DATE") : "-"}
        </td>
      ) : null;
    },
    TIME: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={`${getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)} text-start font-normal font-inter`}
          key={`${col.key}-${index}`}
        >
          <div className="w-[6.5rem] text-start">
            {col.key in data ? formatDateTime(data[col.key], "TIME") : "-"}
          </div>
        </td>
      ) : null;
    },
    DATETIME: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {col.key in data ? formatDateTime(data[col.key], "DATETIME") : "-"}
        </td>
      ) : null;
    },
    ACCOUNT: (col, index) => {
      // const bData = isBrowser() && localStorage.getItem("bankNameList");
      // const parsedBnkData = bData ? JSON.parse(bData) : null;
      // const dImg = parsedBnkData?.find((item: any) => item?.bankCode === data[`bankName`]);
      return col.visible ? (
        <td
          className={`w-max ${getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)} text-start items-center justify-center font-normal font-inter`}
          key={`${col.key}-${index}`}
        >
          {data['paymentMode'] === "ACCOUNT" ? (
            <div className="w-max flex justify-center items-center gap-2">
              <div className="w-[46px] h-[36px] flex justify-center items-center rounded-md px-[4px] py-[8px] border-[1px] border-[#D0D5DD]">
                {/* <img src={`data:image/png;base64,${dImg?.icon}`} alt="bankIcon" /> */}
              </div>
              <div className="flex justify-between items-center gap-[.25rem] h-[100%]">
                <div>
                  <p>{data[`accountName`] || data[`pName`] }</p>
                  <p>{data[`accountNo`]}</p>
                  <p>{data[`ifscCode`]}</p>
                </div>
              </div>
            </div>
          ) : data[`paymentMode`] === "UPI" ? (
            <>
              <p>{data[`accountName`] || data[`pName`]}</p>
              <p>{data[`upiId`]}</p>
            </>
          ) : ""}
        </td>
      ) : null;
    },
    TOGGLE_SWITCH: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={`${getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)} text-start items-center justify-center font-normal font-inter`}
          key={`${col.key}-${index}`}
        >
          <label className="relative inline-block w-[2.125rem] h-[1.35rem] disabled:cursor-not-allowed rounded-full">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={data[`${col.key}`] === true}
              disabled
            />
            <span className="absolute inset-0 bg-gray-400 peer-checked:bg-primary rounded-full transition-colors duration-300"></span>
            <span className="absolute left-1 bottom-1 w-[0.875rem] h-[0.875rem] bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-[0.75rem]"></span>
          </label>
        </td>
      ) : null;
    },
    AMOUNT: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          <div className="relative flex items-center gap-1">
          <p className={`text-primary  text-[0.875rem] font-medium`}>{col.key in data ? divisibleWithTwoDecimals(data[col.key]) : "-"}</p>
          </div>
        </td>
      ) : null;
    },
    COPY_AMOUNT: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          <CopyableCell
            value={col.key in data ? divisibleWithTwoDecimals(data[col.key]) : "-"}
            rowIndex={rowIndex}
            copiedKey={copiedKey}
            setCopiedKey={setCopiedKey}
            setRowDataIndex={setRowDataIndex}
            type="amount"
          />
        </td>
      ) : null;
    },
    BANKLIST: (col, index) => {
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {/* {masterBankListMap.get(data[`${col.key}`])?.bankName} */}   
        </td>
      ) : null;
    },
    NUMBER: (col, index) => {
      if (!col.key) return null;
      return col.visible && col.key ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {col.key in data && data[col.key] !== undefined && data[col.key] !== null
            ? formatNumberWithCommas(data[col.key])
            : "-"}
        </td>
      ) : null;
    },
    IMAGE: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {col.key in data && data[col.key] === "data:image/png;base64,undefined" ? (
            "Match Not Found"
          ) : (
            <img src={data[col.key]} alt="match_logo" width="50px" height="50px" />
          )}
        </td>
      ) : null;
    },
    IMAGECLICKABLE: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {col.key in data && data[col.key] === "data:image/png;base64,undefined" ? (
            "Match Not Found"
          ) : (
            <img
              src={data[col.key]}
              alt="match_logo"
              width="50px"
              height="50px"
              onClick={() => onClick({ key: col.key, data })}
              className="cursor-pointer"
            />
          )}
        </td>
      ) : null;
    },
    BANKDETAILS: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
          style={{
            color:
              col.key in data && data[col.key] === "CONFIRMED"
                ? "green"
                : col.key in data && data[col.key] === "FAILED"
                ? "red"
                : "",
          }}
        >
          {col.key in data ? getButtonStyles(data[col.key]).label : "-"}
        </td>
      ) : null;
    },
    PERCENTAGE: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {col.key in data && data[col.key] != null ? `${data[col.key].toFixed(2)}%` : "-"}
        </td>
      ) : null;
    },
    ISARRAY: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
        >
          {col.key in data && data[col.key] != null ? data[col.key].toString() : "-"}
        </td>
      ) : null;
    },
    STATUS: (col, index) => {
      if (!col.key) return null;
      const { bg, dot, text, label } = getStatusStyles(data[col.key]) || { bg: "", dot: "", text: "", label: data[col.key] || "-" };
      return col.visible ? (
        <td className="w-max text-start px-0" key={`${col.key}-${index}`}>
          <div
            className="w-max flex gap-2 px-4 py-2 items-center justify-center rounded-3xl"
            style={{ backgroundColor: bg }}
          >
            <span
              className="font-inter text-[0.75rem] w-[0.375rem] h-[0.375rem] rounded-full"
              style={{ backgroundColor: dot }}
            ></span>
            <p
              className="text-[0.75rem] font-inter font-medium"
              style={{ color: text }}
            >
              {label}
            </p>
          </div>
        </td>
      ) : null;
    },
    COPY_IMAGE: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className="text-start text-[0.875rem] text-[#475467] font-inter font-normal"
          key={`${col.key}-${index}`}
        >
          <div className="w-max flex items-start justify-start gap-1 text-[0.875rem] text-[#475467] font-inter font-normal py-[0.5rem] px-[1rem]">
            {col.key in data ? "" : "-"}
            <CopyableCell
              value={col.key in data ? data[col.key] : "-"}
              rowIndex={rowIndex}
              copiedKey={copiedKey}
              setCopiedKey={setCopiedKey}
              setRowDataIndex={setRowDataIndex}
            />
          </div>
        </td>
      ) : null;
    },
      DOWNLOAD: (col, index) => {
      if (!col.key) return null;
      return col.visible ? (
        <td
          className="text-start text-[0.875rem] text-[#475467] font-inter font-normal"
          key={`${col.key}-${index}`}
        >
          <div
            className="bg-primary text-white p-[0.5rem] w-max font-bold gap-3 rounded-lg flex cursor-pointer ml-[-2rem]"
            onClick={() => onClick({ key: col.key, data })}
          >
            <span>Download</span>
            {/* <Image src={downIcon} width={16} height={16} alt="Download Icon" /> */}
          </div>
        </td>
      ) : null;
    },
   

   DEFAULT: (col, index) => {
      if (!col.key) return null;
      const value = col.key in data ? data[col.key] : null;
      const { bg, text, label } = value
        ? getButtonStyles(value)
        : { bg: "", text: "", label: "-" };
      const isView = String(value || "").startsWith("upi/images/");
      return col.visible ? (
        <td
          className={getColumnClassNames(col, isVisibleColumnPicker, isVisibleColumnPickerLeft)}
          key={`${col.key}-${index}`}
          onClick={() => onClick({ key: col.key, data })}
        >
          <span
            style={{
              fontSize: "0.875rem",
              fontStyle: "Inter",
              color: col.key === "orderNumber" ? "#101828" : "#475467",
              background: bg,
              padding: bg ? "5px 6px" : "",
              borderRadius: bg ? "12px" : "",
              fontWeight: col.key === "orderNumber" ? "500" : "400",
            }}
            className="w-max"
          >
            {isView ? (
              <div className="bg-primary text-white p-1.5 w-max font-bold gap-1 rounded-lg flex cursor-pointer">
                {/* <Image src={viewIcon} width={16} height={16} alt="Download Icon" /> */}
                <span>View</span>
              </div>
            ) : col.key === "orderNumber" ? (
              `#${value || "-"}`
            ) : (
              label
            )}
          </span>
        </td>
      ) : null;
    },
  };

  return header.map((col: TableHeaders, index: number) => {
    const renderer = columnRenderers[col.type || "DEFAULT"] || columnRenderers.DEFAULT;
    return renderer(col, index);
  });
};

export default SearchTable;