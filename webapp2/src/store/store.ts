import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sampAPI } from "../services/SampService";
import reducers from "./reducers";


const rootReducer = combineReducers(reducers)

//MIDDLEWARE
// const authMiddleware = (store: any) => (next: any) => (action: any) => {
//     const result = next(action);
//     if (action.type?.startsWith('auth/')) {
//         const authState = store.getState().isAuth;
//         localStorage.setItem('isAuth', JSON.stringify(authState))
//     }
//     return result;
// };


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
            //}).concat(authMiddleware).concat(sampAPI.middleware)
        }).concat(sampAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
