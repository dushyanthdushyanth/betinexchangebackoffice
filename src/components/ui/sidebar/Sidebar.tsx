"use client";

import React, { useEffect, useRef, useState } from "react";

import { RxCross2 } from "react-icons/rx";
import SidebarMenu from "./SidebarMenu";
import { VscThreeBars } from "react-icons/vsc";
import { handleSidebar } from "./state/sidebarSlice";
import { motion } from "framer-motion";
import useSidebarData from "./data/useSidebarData";
import { RootState, useDispatch, useSelector ,resetAll} from "@/redux/store";
// import { logout, reSetActiveLinks } from "@/redux/slices/dashboardSlice";
import Hamburger from "../icons/Hamburger";
import Logo from "../icons/logo.png";
import WithdrawalSearchIcon from "../icons/WithdrawalSearchIcon"
import WithdrawLanguage from "../icons/WithdrawLanguage";
import Image from 'next/image';
import WithdrawSettings from "../icons/WithdrawSettings";
import { isBrowser,showToast } from "@/utils";
import WithdrawExitIcon from "../icons/WithdrawExitIcon"
import profile from "../icons/profile.png"
import { clearCookies } from "@/redux/slices/cookieSlice";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state: RootState) => state.sidebarReducer);
  const { permissions } = useSelector(
    (state: RootState) => state.cookieReducer
  );

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isXl, setIsXl] = useState(false);

  useEffect(() => {
    setIsXl(window.matchMedia("(max-width: 1300px)").matches);
  }, []);

  useEffect(() => {
    const handleCloseOutside = (event: any) => {
      // if (sidebarRef?.current && !sidebarRef.current.contains(event.target)) {
        // dispatch(handleSidebar());
      // }
    };
    isXl &&
      isOpened &&
      document.addEventListener("mousedown", handleCloseOutside);
    return () => {
      document.removeEventListener("mousedown", handleCloseOutside);
    };
  }, [sidebarRef, isOpened]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1300px)");
    const handleMediaQueryChange = (e: any) => setIsXl(e.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  const toggleIcon = () => {
    dispatch(handleSidebar());
  };

  // useEffect(() => dispatch(handleSidebar()), [dispatch]);

  const SIDEBAR_LINKS: any = useSidebarData(permissions);

  const hrefNameMap:any = {};

  

  useEffect(()=>{
    if(isBrowser()){
      SIDEBAR_LINKS.forEach((item: any) => {
        item?.sublinks?.forEach((sublink: any) => {
          if (sublink && sublink.href && sublink.name) {
            hrefNameMap[sublink.href] = sublink.name;
          }
          sublink?.sublinks?.forEach((sublink: any) => {
            if (sublink && sublink.href && sublink.name) {
              hrefNameMap[sublink.href] = sublink.name;
            }
          });
        });
      });
      localStorage.setItem("breadCrumObject",JSON.stringify(hrefNameMap))
    }
  },[])

  const userNames = isBrowser() && localStorage.getItem("userName")

  const handleLogout = async () => {
    typeof window !== "undefined" && localStorage.clear();
    dispatch(clearCookies());
    // dispatch(reSetActiveLinks());
    dispatch(resetAll())
    router.push("/login");
    isBrowser() && localStorage.clear();
    showToast("success", "Logged out successfully !");
  };

  const handleRouteClick = () => {
    router.push("/dashboard/withdrawals")
  }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    ref={sidebarRef}
    className={`${isOpened ? 'w-[280px] bg-black' : 'w-[50px]'} h-screen flex flex-col bg-primary`}
  >
    {/* Top Section - Scrollable when needed */}
    <div className="flex flex-col grow overflow-y-auto min-h-0">
      {/* Logo Section */}
      <div className="w-full pt-[2rem]">
        <div
          className={`cursor-pointer ${isOpened ? 'px-[1.5rem] flex justify-start items-center gap-[0.625rem]' : 'px-[8px] py-[9px]'} w-full`}
          onClick={handleRouteClick}
        >
          {isOpened ? (
            <>
              <span className="text-accent">
                {/* <Image src={Logo} alt="logo" /> */}
              </span>
              <span className="text-[1.25rem] font-inter font-semibold text-accent">
                Multi-Tenant
              </span>
            </>
          ) : (
            <span className="text-accent">
              {/* <Image src={Logo} alt="logo" /> */}
            </span>
          )}
        </div>
  
        {/* Search Bar */}
        <div className={`${isOpened ? 'px-[1.5rem] h-max mt-[1.5rem]' : 'px-[16px] h-max mt-[1.5rem]'}`}>
          {isOpened ? (
            <div className="flex items-center rounded-lg bg-[#475467] h-[2.75rem] pl-[0.875rem]">
              {/* <div><WithdrawalSearchIcon /></div> */}
              <div className="h-full flex items-center pl-[0.5rem]">
                <input
                  placeholder="Search"
                  className="w-full h-full bg-[#475467] border-none outline-none text-[1rem] font-normal font-inter mr-[0.875rem] text-accent placeholder:text-accent"
                />
              </div>
            </div>
          ) : (
            <span className="px-[1.5rem] cursor-pointer">
              {/* <WithdrawalSearchIcon /> */}
            </span>
          )}
        </div>
  
        {/* Sidebar Links */}
        <div className="w-full relative bg-[#f5f7f6] mt-[1.5rem]">
          {SIDEBAR_LINKS.map((link: any, i: any) => (
            <SidebarMenu key={i} link={link} toggleIcon={toggleIcon} />
          ))}
        </div>
      </div>
    </div>
  
    {/* Bottom Section - Fixed */}
    <div className="w-full flex flex-col px-[1rem] pb-[2rem]">
      {/* <div className="w-full flex flex-col items-center gap-[0.25rem] pb-[1.5rem]">
        {/* {isOpened ? (
          <>
            <div className="w-full pl-[0.75rem] h-[2.5rem] flex items-center gap-[0.75rem] text-[1rem] font-inter font-semibold text-accent">
              <span><WithdrawLanguage /></span><span>Language</span>
            </div>
            <div className="w-full pl-[0.75rem] h-[2.5rem] flex items-center gap-[0.75rem] text-[1rem] font-inter font-semibold text-accent">
              <span><WithdrawSettings /></span><span>Settings</span>
            </div>
          </>
        ) : ( */}
          {/* <>
            <span className="pb-[0.5rem] cursor-pointer"><WithdrawLanguage /></span>
            <span className="h-[2.5rem] cursor-pointer"><WithdrawSettings /></span>
          </> */}
        {/* )} 
      </div> */}
  
      {/* Divider Line */}
      <div className="border-t-[1px] border-[#475467]">
        <div className={`${isOpened ? 'flex items-center w-full pl-[0.5rem] pr-[12px] gap-[1.4375rem] pt-[1.5rem]' : 'flex flex-col items-center gap-2 pt-[1.5rem]'}`}>
          <div className="flex gap-[0.75rem] items-center">
            {isOpened ? (
              <>
                <div className="w-[2.5rem] h-max">
                  {/* <Image src={profile} alt="profile" /> */}
                </div>
                <div className="w-[7.8125rem] flex flex-col items-start justify-center text-accent">
                  <span className="text-[0.875rem] font-inter font-semibold">{userNames}</span>
                </div>
              </>
            ) : (
              <div className="w-[2.5rem] h-max pt-[1.5rem]">
                {/* <Image src={profile} alt="profile" /> */}
              </div>
            )}
          </div>
  
          {/* Logout */}
          <div className={`${isOpened ? '' : 'mt-[0.5rem]'} cursor-pointer`} onClick={handleLogout}>
            {/* <WithdrawExitIcon /> */}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  
  

  );
};

export default Sidebar;
