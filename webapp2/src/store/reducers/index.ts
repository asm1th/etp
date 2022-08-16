import { postAPI } from '../../services/PostService'
//import authReducer from './auth'
import authReducer from './authRTK/authSlice'
import userReducer from './user/userSlice'
import tripReducer from './trip/tripSlice'

const reducers = {
    userReducer: userReducer,
    authReducer: authReducer,
    [postAPI.reducerPath]: postAPI.reducer,
    tripReducer: tripReducer,
    //settings: (state = {}) => state,
}

export default reducers;