import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../../models/test/IUser";

// axios
// import { AppDispatch } from "../store";
// import { userSlice } from "./UserSlice";

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching())
//         const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e) {
//         dispatch(userSlice.actions.usersFetchingError((e as Error).message))
//     }
// }

export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>('http://localhost:5000/users');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Не загрузилось")
        }
    }
)