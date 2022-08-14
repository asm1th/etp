import { postAPI } from '../../services/PostService'
//import authReducer from './auth'
import authReducer from './authRTK/authSlice'
import userReducer from './user/userSlice'

const reducers = {
    userReducer,
    authReducer,
    [postAPI.reducerPath]: postAPI.reducer
}

export default reducers;