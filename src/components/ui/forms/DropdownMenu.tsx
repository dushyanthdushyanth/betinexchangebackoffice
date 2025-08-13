import React, { Fragment, Key, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { COLORS_COMBINATION } from "../../colors/colors"

export default function DropdownMenu({
  options,
  onChange,
  value,
  isNavbar = false,
  isBottom = false,
  isBorderRequired = true,
  isWidthFull = false,
  disabled = false,
  isTableDropDown = false,
  multiple = false,
}:any) {
  function handleChange(e:any) {
    onChange(e.target.value);
  }
  return (
    <>
      <FormControl
        size="small"
        fullWidth={isWidthFull}
        sx={{ fontSize: "0.8rem" ,
           
          "& .MuiInputBase-formControl" : {
            paddingTop : "0 !important",
            height : "70% !important"
          },

        }}
        focused={false}
      >
        <Select
          value={value}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          displayEmpty={true}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isBorderRequired
                ? `${COLORS_COMBINATION["dropdown-border-color"]} !important`
                : "transparent !important",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent !important",
            },
            "& .MuiSelect-icon": {
              color: isNavbar ? "white" : "black",
              fontSize: "1.9rem !important",
            },
            height: "2rem !important",
            fontSize: "0.85rem",
            color: isNavbar
              ? "white"
              : `${COLORS_COMBINATION["text-color-dark"]}`,
            fontWeight: isNavbar ? "700" : "400",
            fontFamily: isNavbar ? "var(--font-poppins)" : "var(--font-prompt)",
            paddingTop:"0 !important",
          }}
        >
          {options.map((option:any, i:any) => {
            return (
              <MenuItem
                value={option.value}
                key={i}
                disabled={
                  option.value === "" || option.value === " " || option.disabled
                }
                hidden={option.value === "" || option.value === " "}
                sx={
                  option.value === "" || option.value === " "
                    ? { fontSize: "0.85rem !important", display: "none" }
                    : { fontSize: "0.85rem !important" }
                }
              >
                {option.name || option.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
