
import React from "react";

const Channels = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 61 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main monitor shape */}
    <path
      d="M29.6079 36.1852H2.29311C1.78174 36.1852 1.36719 35.7706 1.36719 35.2593V1.46296C1.36719 1.20728 1.57446 1 1.83015 1H54.3764C54.8878 1 55.3024 1.41455 55.3024 1.92593V22.2416"
      stroke="white"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Stand and base */}
    <path
      d="M22.6641 36.1875V41.2801M22.6641 41.2801H30.303M22.6641 41.2801H19.6548C17.34 41.2801 16.4141 43.0856 16.4141 44.7523H32.6178"
      stroke="white"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Channel circle */}
    <path
      d="M60.6276 36.4193C60.6276 44.4734 54.0984 51.0026 46.0443 51.0026C37.9901 51.0026 31.4609 44.4734 31.4609 36.4193C31.4609 28.3651 37.9901 21.8359 46.0443 21.8359C54.0984 21.8359 60.6276 28.3651 60.6276 36.4193ZM33.3128 36.4193C33.3128 43.4507 39.0129 49.1507 46.0443 49.1507C53.0757 49.1507 58.7757 43.4507 58.7757 36.4193C58.7757 29.3879 53.0757 23.6878 46.0443 23.6878C39.0129 23.6878 33.3128 29.3879 33.3128 36.4193Z"
      fill="none"
      stroke="white"
      strokeWidth={2}
    />
    {/* Channel lines */}
    <rect
      x="50.0938"
      y="26.9219"
      width="1.85"
      height="7.89"
      rx="0.93"
      stroke="white"
      transform="rotate(47 50.0938 26.9219)"
      fill="none"
    />
    <rect
      x="44.3906"
      y="32.3594"
      width="1.89"
      height="7.89"
      rx="0.95"
      stroke="white"
      transform="rotate(-42 44.3906 32.3594)"
      fill="none"
    />
    <rect
      width="1.85"
      height="7.89"
      rx="0.93"
      transform="matrix(-0.682 0.731 0.731 0.682 41.9766 34.3281)"
      stroke="white"
      fill="none"
    />
    <rect
      width="1.89"
      height="7.89"
      rx="0.95"
      transform="matrix(-0.743 -0.669 -0.669 0.743 47.6797 39.7656)"
      stroke="white"
      fill="none"
    />
    {/* Dots */}
    {[4, 8, 12, 16, 20, 24].map((x) => (
      <rect key={x} x={x} y={30} width={2} height={2} rx={1} stroke="white" fill="none" />
    ))}
  </svg>
);

export default Channels;
