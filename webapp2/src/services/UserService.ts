import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/test/IUser";

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        //return axios.get<IUser[]>('./users.json')
        return axios.get<IUser[]>('http://localhost:5000/users')
    }
}