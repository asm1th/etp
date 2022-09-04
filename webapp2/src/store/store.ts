import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sampAPI } from "../services/SampService";
import reducers from "./reducers";

const rootReducer = combineReducers(reducers)

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredPaths: [
                        'mainReducer.dateStartKP',
                        'mainReducer.dateEndKP',
                        'mainReducer.dateContract',
                        'mainReducer.dateKP'
                    ],
                }
            }).concat(sampAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
