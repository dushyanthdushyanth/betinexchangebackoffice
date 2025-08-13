"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import { RootState, useDispatch, useSelector } from "@/redux/store";

// import BreadCrumbIcon from "../mui/BreadCrumbIcon";
// import { DropdownRightArrow } from "../icons";
import { handleSidebar } from "@/components/ui/sidebar/state/sidebarSlice";

const WebsiteSkeleton = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state: RootState) => state.sidebarReducer);

  const toggleIcon = () => {
    dispatch(handleSidebar());
  };

  return (
		<div className="flex sm:h-[100vh] h-[100vh] bg-primary relative">
      <Sidebar />
      <div onClick={toggleIcon}
      className={`
        absolute top-[50%]  flex items-center justify-center
        z-[10000] bg-primary w-[2rem] h-[3rem] cursor-pointer
        transition-transform duration-300
        ${!isOpened ? 'left-[1.75rem]' : 'left-[270px]'}
      `}>
        {/* <DropdownRightArrow className={`${!isOpened ? 'rotate-0' : 'rotate-180'}`}/> */}
      </div>
      <main className="flex-1 h-[calc(100vh - 0.75rem)] mt-[0.75rem] overflow-x-scroll bg-primary overflow-none">
        {/* <DashboardNav /> */}
        <main className="px-[1rem] h-[100%] overflow-y-scroll xl:px-[2rem] rounded-tl-[2.5rem] bg-[#fff]">
        {/* <BreadCrumbIcon name="dafsdf" link="fusgidfd"/> */}
          {children}
          </main>
      </main>
 
    </div>
	) 
}; 

export default WebsiteSkeleton;
