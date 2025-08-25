import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  selectTableState,
  setTableState,
  clearTableState,
  TableState,
} from "@/redux/slices/tableSlice";
import { useCallback } from "react";

interface UseTableReturn {
  tableState: TableState;
  updateTableState: (updates: Partial<TableState>) => void;
  resetTableState: () => void;
  getTableState: () => TableState;
}

export function useTable(): UseTableReturn {
  const dispatch = useDispatch();
  const tableState = useSelector((state: RootState) => selectTableState(state));

  const updateTableState = useCallback(
    (updates: Partial<TableState>) => {
      dispatch(setTableState(updates));
    },
    [dispatch]
  );

  const resetTableState = useCallback(() => {
    dispatch(clearTableState());
  }, [dispatch]);

  const getTableState = useCallback((): TableState => {
    return tableState;
  }, [tableState]);

  return {
    tableState,
    updateTableState,
    resetTableState,
    getTableState,
  };
}
