import { useDispatch, useSelector } from "react-redux";

import {
  setCrudState,
  clearCrudState,
  selectCrudState,
} from "../redux/slices/crudSlice";

export type UseCrudReturn = {
  crudState: ReturnType<typeof selectCrudState>;
  setCrudState: (payload: Partial<ReturnType<typeof selectCrudState>>) => void;
  clearCrudState: () => void;
  isEditMode: boolean;
  elementId: number | undefined;
  record: unknown;
  identifier: string | undefined;
};

export const useCrud = (): UseCrudReturn => {
  const dispatch = useDispatch();
  const crudState = useSelector(selectCrudState);

  return {
    crudState,
    setCrudState: (payload) => dispatch(setCrudState(payload)),
    clearCrudState: () => dispatch(clearCrudState()),
    isEditMode: crudState.isEditMode || false,
    elementId: crudState.elementId,
    record: crudState.record,
    identifier: crudState.identifier,
  };
};
