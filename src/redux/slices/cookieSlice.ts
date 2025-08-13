import { isBrowser } from "@/utils";
import { axiosClient } from "@/utils/axios";
import { Draft, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { resetAll } from "../store";

interface CookieState {
  accessToken: string | null;
  clientId: string | null;
  clientName:string | null
  permissions: [];
  channelList: [];
  masterBankList: MasterBankList[]
}

export interface MasterBankList {
  bankCode: string | null;
  bankName: string | null;
  type: [];
}

const localStoragePermissions = isBrowser() && localStorage.getItem("permissions");
const permissions = isBrowser()
  ? localStoragePermissions
    ? JSON.parse(localStoragePermissions)
    : []
  : [];

const localStorageChannel = isBrowser() && localStorage.getItem("channelList");
const channelList = isBrowser()
  ? localStorageChannel
    ? JSON.parse(localStorageChannel)
    : []
  : [];

  const localStorageMasterBankList = isBrowser() && localStorage.getItem("bankNameList");
  const masterBankList = isBrowser()
    ? localStorageMasterBankList
      ? JSON.parse(localStorageMasterBankList)
      : []
    : [];

  const initialState: CookieState = {
  accessToken: null,
  clientId: null,
  permissions,
  clientName:null,
  masterBankList: masterBankList,
  channelList
};

const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      Cookies.set("accessToken", action.payload);
    },
    setPermissions(
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.permissions>
    ) {
      state.permissions = action.payload;
    },
    setClientId: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload)) {
        state.clientId = action.payload[0];
        Cookies.set("clientId", action.payload[0]);
      } else {
        state.clientId = action.payload;
        Cookies.set("clientId", action.payload);
      }
    },
    clearCookies: (state) => {
      state.accessToken = null;
      state.clientId = null;
      Cookies.remove("accessToken");
      Cookies.remove("clientId");
    },
    setMasterBankList(
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.masterBankList>
    ) {
      state.masterBankList = action.payload;
    },
    setChannelList(
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.channelList>
    ) {
      state.channelList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState); // Reset slice when resetAll is dispatched
  },
});

export const getPermissions = (permissions: any) => async (dispatch: any) => {
  isBrowser() &&
    permissions.length &&
    localStorage.setItem("permissions", JSON.stringify(permissions));
  dispatch(setPermissions(permissions));
};

export const { setAccessToken, setClientId, clearCookies, setPermissions, setMasterBankList, setChannelList } =
  cookieSlice.actions;

export default cookieSlice.reducer;
