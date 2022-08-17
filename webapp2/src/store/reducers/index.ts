import { postAPI } from '../../services/PostService'
//import authReducer from './auth'
import authReducer from './authRTK/authSlice'
import userReducer from './user/userSlice'
import mainReducer from './main/mainSlice'

const reducers = {
    userReducer: userReducer,
    authReducer: authReducer,
    [postAPI.reducerPath]: postAPI.reducer,
    mainReducer: mainReducer,
    //settings: (state = {}) => state,
}

export default reducers;