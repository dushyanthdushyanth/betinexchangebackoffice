import { DropdownArrow, DropdownRightArrow } from "../icons";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { handleSidebar } from "./state/sidebarSlice";
import SidebarMenuSublinks from "./SidebarMenuSublinks";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { usePathname } from "next/navigation";

const SidebarMenu = ({ link,toggleIcon }: any) => {
  const [showSubnav, setShowSubnav] = useState<boolean>(false);
  const { isOpened } = useSelector((state: RootState) => state.sidebarReducer);
  const pathName = usePathname()

  return (
    <>
      <div
        key={link.name}
        className={`bg-primary ${link?.sublinks?.some((item: any) => item.href === pathName) ? " bg-primary text-[#4AC5B3]" : ""} 
    flex align-center w-[100%] relative py-[9px] px-[1rem] h-[40px] text-sm text-[var(--text-sidebarColor)]   
    ${showSubnav && isOpened && "bg-primary"}
    ${!isOpened && "sidebarIcons "}   
     items-center cursor-pointer  relative group`}
        onClick={() => {
          isOpened ? setShowSubnav((prev) => !prev) : toggleIcon();
        }}
      >
        {!isOpened ? (
          <Tooltip
            title={link.name}
            disableInteractive
            placement="right"
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "window",
                    },
                  },
                ],
              },
              tooltip: {
                sx: {
                  backgroundColor: "#7F56D9",
                  color: "white",
                  fontSize: "12px",
                },
              },
              arrow: {
                sx: {
                  color: "#7F56D9",
                },
              },
            }}
          >
            <span>{link.icon}</span>
          </Tooltip>

        ) : (
          <span>{link.icon}</span>
        )}


        {isOpened && (
          <p
            className={`flex justify-start items-center text-[#D0D5DD] font-inter text-[1rem] h-[2.5rem] font-semibold ${link?.sublinks?.some((item: any) => item.href === pathName) ? "bg-primary text-[#4AC5B3]" : ""
              } text-[#4AC5B3]  font-semibold flex-1`}
          >
            {link.name}
          </p>
        )}

        {isOpened && link.sublinks && showSubnav ? (
          <DropdownArrow className="w-max h-4 text-[#4AC5B3] pl-[0.25rem]" />
        ) : link?.sublinks?.length && isOpened ? (
          <DropdownRightArrow className="w-max h-4 pl-[0.25rem] text-[#4AC5B3]" />
        ) : null}
      </div>

      {showSubnav && isOpened && (
        <SidebarMenuSublinks links={link.sublinks} show={showSubnav} />
      )}
    </>
  );
};

export default SidebarMenu;
