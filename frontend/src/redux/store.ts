import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import crudSlice from "./slices/crudSlice";
import tableSlice from "./slices/tableSlice";

import { baseApi as api } from "./services/base-api";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""], // Whitelist the reducers you want to persist
};

const rootReducer = combineReducers({
  crud: crudSlice,
  table: tableSlice,
  [api.reducerPath]: api.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor, store };
