import React from "react";

const Logo = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_148_20388)">
        <rect width="32" height="32" rx="6" fill="white" />
        <circle cx="16" cy="15.9997" r="8.61783" fill="#7F56D9" />
        <foreignObject x="-4" y="12" width="40" height="24">
  <div
    dangerouslySetInnerHTML={{
      __html: `
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          backdrop-filter: blur(2px);
          height: 100%;
          width: 100%;
        ">
          <!-- Your content here -->
        </div>
      `,
    }}
  />
</foreignObject>
        <rect
          data-figma-bg-blur-radius="4"
          y="16"
          width="32"
          height="16"
          fill="white"
          fillOpacity="0.02"
        />
      </g>
      <defs>
        <clipPath id="bgblur_1_148_20388_clip_path" transform="translate(4 -12)">
          <rect y="16" width="32" height="16" />
        </clipPath>
        <clipPath id="clip0_148_20388">
          <rect width="32" height="32" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
