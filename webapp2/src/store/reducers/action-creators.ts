import {AuthActionCreators} from "./auth/action-creators";
import {EventActionCreators} from "./event/action-creators";
//import {fetchUsers} from "./users/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    //EventActionCreators
    //...fetchUsers
}