import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { regData } from "./regData"
import { IRegData } from "../../../models/IRegistration"

interface IFormErrors {
    "lastname": string,
    "firstname": string,
    "patronymic": string,
    "email": string,
    "org_fullname": string,
    "org_shortname": string,
    "org_telephone": string,
    "org_email": string,
    "password": string,
    "inn": string,
    "kpp": string,
    "isResident": string,
    "isIndividual": string,
    "isToken": string,
    "isSmsp": string
}

interface regState {
    regData: IRegData;
    isValid: boolean,
    isAccept: boolean,
    formErrors: IFormErrors
}

const initialState: regState = {
    regData: regData,
    isValid: true,
    isAccept: false,
    formErrors: {
        "lastname": "",
        "firstname": "",
        "patronymic": "",
        "email": "",
        "org_fullname": "",
        "org_shortname": "",
        "org_telephone": "",
        "org_email": "",
        "password": "",
        "inn": "",
        "kpp": "",
        "isResident": "",
        "isIndividual": "",
        "isToken": "",
        "isSmsp": ""
        }
}


export const regSlice = createSlice({
    name: 'regData',
    initialState,
    reducers: {
        setRegData: (state, action: PayloadAction<IRegData>) => {
            //debugger
            //save full object
            //state.regData = action.payload;
            // state.isLoading = false;
            // state.error = '';
        },
        setRegDataProp: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.prop
            let reg: any = state.regData
            reg[prop] = action.payload.value;
        },
        setRegDataBool: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.e.target.name
            let reg: any = state.regData
            reg[prop] = action.payload.checked;
        },
        setRegDataError: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.prop
            let formErrors: any = state.formErrors
            formErrors[prop] = action.payload.value;
        },
        setIsValid: (state, action: PayloadAction<boolean>) => {
            state.isValid = action.payload;
        },
    },
})

export default regSlice.reducer;