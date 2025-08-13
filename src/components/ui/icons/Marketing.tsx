import React from "react";
import { cn } from "../../../utils/index";

const Marketing = (props?: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 512"
      // strokeWidth={1.5}
      stroke="currentColor"
      width="14" height="14"
      {...props}
    >
      <path
        fill="currentColor"
        d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
      />
    </svg>
  );
};

export default Marketing;
