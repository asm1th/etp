import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postAPI } from "../services/PostService";
import userReducer from './reducers/UserSlice'

//https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/authentication-with-extrareducers?from-embed=&file=/src/app/store.ts:88-139
import { api } from './store/reducers/Auth'
import authReducer from './store/reducers/authSlice'

const rootReducer = combineReducers({
    userReducer,
    [postAPI.reducerPath]: postAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(postAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']