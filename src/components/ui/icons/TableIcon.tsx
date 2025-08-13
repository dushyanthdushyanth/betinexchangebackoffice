
import { COLORS_COMBINATION } from "@/components/colors/colors";
import React from "react";

function TableIcon() {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" 
    //  width="20"
    // height="24"
    // viewBox="0 0 448 512">
    //   <path
    //    fill-rule="evenodd"
    //     clip-rule="evenodd"
    //    d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"
    //    fill={COLORS_COMBINATION["filter-color"]}
    //    />
    //    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="20"
    height="24"
    viewBox="0 0 512 512">
      <path 
           fill-rule="evenodd"
        clip-rule="evenodd"
      d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"
      fill={COLORS_COMBINATION["filter-color"]}
       />
    </svg>
  );
}

export default TableIcon;
