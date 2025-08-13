import React, { ButtonHTMLAttributes, JSXElementConstructor } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  color?: "red" | "blue" | "green" | "gray" | "indigo" | "light" | "lightBlue" | "secondary" | "primary";
  onClick?: (e: any) => any;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
}

// eslint-disable-next-line react/display-name
const Button = React.forwardRef((props: ButtonProps, ref) => {
  const {
    href,
    className,
    color,
    onClick,
    active,
    loading,
    disabled,
    children,
    Component = "button",
    ...rest
  } = props;

  const c =
    color === "blue" 
      ? "text-secondaryColor border-2 border-secondaryColor hover:bg-secondaryColorLight hover:border-secondaryColor"
      :color === "primary" ? 
      "bg-primaryColor hover:bg-primaryColorLight text-secondaryColor border-2 border-[#B0C0F0] hover:border-primaryColorLight rounded-lg" : 
      "";
  const extractTextSize = className?.split(" ")?.filter((classes)=>{
    if(classes.includes('text')){
      return classes
    }
  })?.join(' ') 
  
  const extractPY = className?.split(" ")?.filter((classes)=>{
    if(classes.includes('py-')){
      return classes
    }
  })?.join(' ')


  let otherClasses = className?.split(" ")?.filter((classes)=>{
    if(!classes.includes('text') ){
      return classes
    }
  })?.join(' ') 
  
  otherClasses = className?.split(" ")?.filter((classes)=>{
    if(!classes.includes('py-') ){
      return classes
    }
  })?.join(' ')

  const textSize = extractTextSize || "sm:text-sm"
  const py = extractPY || "py-[0.130rem]"
  
  return (
    <Component
      ref={ref}
      onClick={onClick}
      aria-pressed={active}
      className={`px-6 min-w-max font-inter  ${c} cursor-pointer disabled:-z-1 font-poppins ${textSize +" "+ py + " "+otherClasses}  ${otherClasses?.includes("font-bold")? "font-bold" :"font-medium"}`}
      disabled={disabled}
      {...rest}
    >
      <>
      {children}
      </>
    </Component>
  );
});

export default Button;
