import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

import rootReducer from "./features/combinedReducer";
import orgReducer from './features/Org/orgSlice'
// import createCrosstabListener from "../redux/crossTablistener";

const persistConfig = {
  key: 'root',
  storage,
}
// const crosstabMiddleware = createCrosstabMiddleware({ key: 'root' });

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

