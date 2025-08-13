import { DropdownArrow, DropdownRightArrow } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import { RootState, useDispatch, useSelector } from "@/redux/store";

import Link from "next/link";
import React, { useState } from "react";
// import { pushToActiveLinks } from "@/redux/slices/dashboardSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { handleSidebar } from "./state/sidebarSlice";

const SidebarMenuSublinks = ({ links, show }: any) => {
  console.log("gbfdvgdfg",links)
  const { isOpened } = useSelector((state: RootState) => state.sidebarReducer);
  return (
    <AnimatePresence>
      <motion.div
        layout
        key={show}
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        className="flex flex-col w-[100%] pl-7 pr-1 gap-[0.5px] bg-primary"
      >
        {isOpened &&
          links?.map((link: any, i: any) => {
            return (
              <MenuChilds index={i} link={link} key={i} isOpened={isOpened}/>
            );
          })}
      </motion.div>
    </AnimatePresence>
  );
};

const MenuChilds = ({ link, index, isOpened }: any) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [showSubnav, setShowSubnav] = useState<boolean>(false);
  const router = useRouter();
  // const toggleIcon = () => {
  //   dispatch(handleSidebar());
  // };
  return (
    <React.Fragment key={index}>
      {link && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={link.name}
          // onClick={() => {
          //   link?.sublinks
          //     ? ""
          //     : dispatch(
          //       pushToActiveLinks(
          //         {
          //           name: link.name,
          //           href: link.href,
          //           id: link.id,
          //         },
          //         router
          //       )
          //     );
          // }}
        >
          {link?.sublinks ? (
            <>
              <div
                key={link.name}
                className={`flex w-full p-1 px-4 text-[var(--text-sidebarColor)] ${showSubnav && isOpened && " [var(--text-sidebarColor)]"
                  }   gap-4 items-center cursor-pointer ${link?.name === "Brand Config" 
                  }`}
                onClick={() => setShowSubnav((prev) => !prev)}
              >
                {link.icon}
                {isOpened && (
                  <p className="text-accent text-[15px] font-semibold flex-1">
                    {link.name}
                  </p>
                )}
                {isOpened && link.sublinks && showSubnav ? (
                  <DropdownArrow className="w-4 h-4" />
                ) : link.sublinks.length && isOpened ? (
                  <DropdownRightArrow className="w-4 h-4" />
                ) : null}
              </div>
              {showSubnav && isOpened && (
                <SidebarMenuSublinks links={link.sublinks} show={true} />
              )}
            </>
          ) : (
            <span
              className={`w-[100%] h-[2.5rem] rounded-lg  flex relative justify-center items-center ${isOpened && "font-accent"
                }  transition-all cursor-pointer duration-150 gap-4 items-center  ${pathname == link.href
                  ? "text-[1rem] font-semibold font-inter font-accent pl-[0.75rem] pr-[9px] gap-[0.5rem] bg-[#475467]"
                  : "text-[var([var(--text-sidebarColor)])] "
                }`}
            // onClick={()dispatch(setBreadCrumName(link.name))}
            >
              <span>{link.icon}</span>
              {isOpened && (
                <p
                  className={`text-sm font-bold flex-1 ${pathname == link.href ? "text-accent" : "text-accent"
                    }`}
                >
                  {link.name}
                </p>
              )}
            </span>
          )}
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default SidebarMenuSublinks;
