import { isBrowser } from "@/utils";
import { sidebarState } from "./sidebarState";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
// Helper function to save state to local storage
const saveStateToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('sidebarState', serializedState);
  } catch (error) {
    console.error('Could not save state', error);
  }
};

// Helper function to load state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState: any = isBrowser() && localStorage.getItem('sidebarState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load state', error);
    return undefined;
  }
};

const persistedState = loadStateFromLocalStorage();

export const SidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState: persistedState ? persistedState : sidebarState,
  reducers: {
    showSidebar(state: Draft<typeof sidebarState>, action: PayloadAction<any>) {
      state.isOpened = action.payload;
      saveStateToLocalStorage(state); // Save the state to local storage
    },
  },
});

export const { showSidebar } = SidebarSlice.actions;

export const handleSidebar = () => (dispatch: any, getState: any) => {
  const currentState = getState().sidebarReducer.isOpened;
  dispatch(showSidebar(!currentState));
};

export default SidebarSlice.reducer;
