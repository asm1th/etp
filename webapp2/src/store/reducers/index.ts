import { postAPI } from '../../services/PostService'
import auth from './auth'

export default {
    auth,
    [postAPI.reducerPath]: postAPI.reducer
}