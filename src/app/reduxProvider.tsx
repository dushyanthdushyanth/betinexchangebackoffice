"use client";

import AppProvider from "../redux/AppProvider";
import React from "react";

export default function ReduxProvider({ children }:any) {
  return <AppProvider>{children}</AppProvider>;
}
