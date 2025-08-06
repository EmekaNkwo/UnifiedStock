import { createSlice } from "@reduxjs/toolkit";
import { isArray, mergeWith } from "lodash";
import { RootState } from "../store";
import { UserResponseDto } from "../services/auth-api";

export type CrudState = {
  elementId?: number;
  isEditMode?: boolean;
  record?: unknown;
  userProfile?: UserResponseDto;
  identifier?: string;
};

export const initialState = {
  crudState: {
    elementId: undefined,
    isEditMode: false,
    record: undefined,
    userProfile: undefined,
    identifier: undefined,
  },
} as {
  crudState: CrudState;
};

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    setCrudState: (state, action) => {
      state.crudState = mergeWith(
        state.crudState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (isArray(objValue)) {
            return srcValue;
          }
        }
      );
    },
    clearCrudState: (state) => {
      state.crudState = initialState.crudState;
    },
  },
});

export const { setCrudState, clearCrudState } = crudSlice.actions;

export const selectCrudState = (state: RootState): CrudState => {
  return state.crud.crudState;
};

export default crudSlice.reducer;
