import { createSlice } from "@reduxjs/toolkit";
import { isArray, mergeWith } from "lodash";
import { RootState } from "../store";

export type TableState = {
  pageSize?: number;
  pageNumber?: number;
};

export const initialState = {
  tableState: {
    pageSize: 10,
    pageNumber: 1,
  },
} as {
  tableState: TableState;
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableState: (state, action) => {
      state.tableState = mergeWith(
        state.tableState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (isArray(objValue)) {
            return srcValue;
          }
        }
      );
    },
    clearTableState: (state) => {
      state.tableState = initialState.tableState;
    },
  },
});

export const { setTableState, clearTableState } = tableSlice.actions;

export const selectTableState = (state: RootState): TableState => {
  return state.table.tableState;
};

export default tableSlice.reducer;
