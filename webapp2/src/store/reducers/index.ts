import { postAPI } from '../../services/PostService'
//import authReducer from './auth'
import authReducer from './authRTK/authSlice'
import mainReducer from './main/mainSlice'
import regReducer from './reg/regSlice'
import sampReducer from './main/sampSlice'


const reducers = {
    authReducer: authReducer,
    [postAPI.reducerPath]: postAPI.reducer,
    mainReducer: mainReducer,
    regReducer: regReducer,
    sampReducer: sampReducer
    //settings: (state = {}) => state,
}

export default reducers;