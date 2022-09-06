import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISampNew } from "../../../models/ISamp";
import { RootState } from '../../store'
import {selectCurrentUser} from "../authRTK/authSlice";
import { useAppSelector } from "../../../hooks/redux";

import { AppDispatch } from "../../../store/store";
import { sampSlice } from "./sampSlice";

// export const fetchSamp = (kp_sample_guid: string) => async (dispatch: AppDispatch) => {
//     try {
//         //dispatch(userSlice.actions.usersFetching())
//         const { token } = useAppSelector(state => state.authReducer)
//         const config = {
//             headers: { Authorization: `Bearer ${token}` }
//         };
//         const response = await axios.get<ISampNew[]>(
//             `http://109.195.85.121:5010/samp/${kp_sample_guid}`,
//             config
//         )
//         dispatch(sampSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e) {
//         dispatch(sampSlice.actions.usersFetchingError((e as Error).message))
//     }
// }



// export const fetchUsers = (kp_sample_guid) => createAsyncThunk(
//     'samp/fetchAll',
//     async (_, thunkAPI) => {
//         try {
//             const { token } = useAppSelector(state => state.authReducer)
//             const { token } = useAppSelector(state => state.authReducer)
//             const config = {
//                 headers: { Authorization: `Bearer ${token}` }
//             };
//             const response = await axios.get<ISampNew>(
//                 `http://109.195.85.121:5010/samp/${kp_sample_guid}`,
//                 config
//             );
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue("Не загрузилось")
//         }
//     }
// )