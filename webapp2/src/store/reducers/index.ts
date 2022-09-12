import authReducer from './authRTK/authSlice'
import regReducer from './reg/regSlice'
import sampReducer from './samp/sampSlice'
import { sampAPI } from '../../services/SampService'

const reducers = {
    authReducer: authReducer,
    regReducer: regReducer,
    sampReducer: sampReducer,
    [sampAPI.reducerPath]: sampAPI.reducer
    //settings: (state = {}) => state,
}

export default reducers;