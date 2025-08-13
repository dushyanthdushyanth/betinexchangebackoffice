import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { isBrowser, showToast } from "../../utils/index";
import { resetAll, store } from "./../store";
import { axiosClient } from "@/utils/axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export interface Link {
  name: string;
  href: string;
  id: number
}

interface InitialState {
  activeLinks: any[];
}
const activeLinks = isBrowser() ? localStorage.getItem("active_links") : ""

const initialState: InitialState = {
  activeLinks: [
    ...(isBrowser() && localStorage.getItem("active_links")
      ? Array.isArray(

        activeLinks !== null && JSON.parse(activeLinks)
      )
        ? activeLinks !== null && JSON.parse(activeLinks).map((tab: any) => ({
          id: tab.id,
          name: tab.name,
          href: tab.href,
        }))
        : []
      : []),
  ],
};

const DashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    setActiveLinks(
      state: Draft<typeof initialState>,
      action: PayloadAction<Link>
    ) {
      state.activeLinks.push(action.payload);
    },
    popLink(state: Draft<typeof initialState>, action: PayloadAction<Link>) {
      state.activeLinks = state.activeLinks.filter(
        (l) => l.href !== action.payload.href
      );
    },
    reSetActiveLinks(
      state: Draft<typeof initialState>,
    ) {
      state.activeLinks = [];
    },
    reOrderActiveLinks(
      state: Draft<typeof initialState>,
      action: PayloadAction<Link[]>
    ) {
      state.activeLinks = action.payload;
    },
    replaceActiveLinks(state: Draft<typeof initialState>,
      action: PayloadAction<Link[]>
    ) {
      state.activeLinks = action.payload
    },
    setInitialLinks(
      state: Draft<InitialState>,
      action: PayloadAction<Link[]>
    ) {
      state.activeLinks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState); // Reset slice when resetAll is dispatched
  },
});

export const { setActiveLinks, popLink, reSetActiveLinks,reOrderActiveLinks, replaceActiveLinks,setInitialLinks } =
  DashboardSlice.actions;


export const popFromActiveLinks =
  (link: any) =>
    (dispatch: typeof store.dispatch, getState: typeof store.getState) => {
      dispatch(popLink(link));
      const links = getState().dashboardReducer.activeLinks;
      isBrowser() && localStorage.setItem("active_links", JSON.stringify(links));
    };

const callLogoutApi = async () => {
  const { data } = await axiosClient.get('/api/logout')
  return data
}

export const logout = (router: any, isSignout = false) => async (dispatch: typeof store.dispatch) => {
  typeof window !== "undefined" && localStorage.clear();
  await callLogoutApi()
  !isSignout && showToast(401, "Authorization Token Expired")
  router.push('/login')
};

export default DashboardSlice.reducer;
