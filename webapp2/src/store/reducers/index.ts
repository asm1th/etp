import { postAPI } from '../../services/PostService'
import authReducer from './auth'
import userReducer from './user/userSlice'

const reducers = {
    userReducer,
    authReducer,
    [postAPI.reducerPath]: postAPI.reducer
}

export default reducers;