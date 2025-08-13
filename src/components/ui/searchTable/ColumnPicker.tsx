"use client";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaTable } from "react-icons/fa";
import { Tooltip } from "@mui/material";

export default function ColumnPicker(
  { header, setHeader, permissions = [] }: any
) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pathName = usePathname();

//   const getStorageNameFromUrl = () => {
//     // For CustomerPlayer
//     if (pathName.includes("playerbethistory")) {
//       return "playerbethistoryHeaders";
//     } else if (pathName.includes("paymenthistory")) {
//       return "paymenthistoryHeaders";
//     } else if (pathName.includes("accounthistory")) {
//       return "accounthistoryHeaders";
//     } else if (pathName.includes("loginhistory")) {
//       return "loginhistoryHeaders";
//     } else if (pathName.includes("bankdetails")) {
//       return "bankdetailsHeaders";
//     } else if (pathName.includes("notes")) {
//       return "notesHeaders";
//     }

//     // For Payments & Transaction
//     else if (pathName.includes("payment")) {
//       return "paymentHeaders";
//     } else if (pathName.includes("transaction")) {
//       return "transactionHeaders";
//     }

//     // For UsrPage
//     else if (pathName.includes("user")) {
//       return "userHeaders";
//     }

//     // For DownlineList
//     else if (pathName.includes("affiliate")) {
//       return "downlineListHeaders";
//     } else if (pathName.includes("banking")) {
//       return "bankingHeaders";
//     } else if (pathName.includes("betList")) {
//       return "betListHeaders";
//     } else if (pathName.includes("betRunningLive")) {
//       return "betRunningLiveHeaders";
//     }
//   };

  const [dummyTemp, setDummyTemp] = useState(true);

  const handleHeaderClick = (key: any) => {
    setDummyTemp(!dummyTemp);
    const updatedHeader = header.map((item: any) => {
      if (item["key"] === key) {
        return {
          ...item,
          visible: !item["visible"],
        };
      }
      return item;
    });
    setHeader(updatedHeader);
    // localStorage.setItem(
    //   getStorageNameFromUrl(),
    //   JSON.stringify(updatedHeader)
    // );
  };

  return (
    <div className="w-[100%] h-max flex justify-end items-center">
      <Tooltip title="Add Column" arrow>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FaTable className="cursor-pointer text-lg  text-text-color-dark" />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            // width: "20ch",
          },
        }}
      >
        {header?.map((head: any, i: any) =>
          (head.permission ? permissions.includes(head.permission): true) ? (
            <div
              className="w-[100%] flex justify-start gap-3 items-center px-4 py-1"
              key={i}
            >
              <input
                type="checkbox"
                onClick={() => handleHeaderClick(head.key)}
                checked={head?.visible}
                id={head.name}
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer capitalize font-inter "
                key={i}
                htmlFor={head.name}
              >
                {head.name}
              </label>
            </div>
          ) : null)}
      </Menu>
    </div>
  );
}
