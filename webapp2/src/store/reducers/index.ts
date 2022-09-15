import authReducer from './authRTK/authSlice'
import regReducer from './reg/regSlice'
import sampReducer from './samp/sampSlice'
import dashReducer from './dash/dashSlice'
import zakReducer from './zak/zakSlice'
import { sampAPI } from '../../services/SampService'

const reducers = {
    authReducer: authReducer,
    regReducer: regReducer,
    sampReducer: sampReducer,
    dashReducer: dashReducer,
    zakReducer: zakReducer,
    
    [sampAPI.reducerPath]: sampAPI.reducer
    //settings: (state = {}) => state,
}

export default reducers;