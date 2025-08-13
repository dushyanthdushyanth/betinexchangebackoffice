import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import cookieReducer from './slices/cookieSlice';
import dashboardReducer from "./slices/dashboardSlice"



import { createAction } from '@reduxjs/toolkit';
import sidebarReducer from '@/components/ui/sidebar/state/sidebarSlice';
// Create a global reset action
export const resetAll = createAction('RESET_ALL');

export const store = configureStore({
  reducer: {
    cookieReducer:cookieReducer,
        sidebarReducer: sidebarReducer,
        dashboardReducer: dashboardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
