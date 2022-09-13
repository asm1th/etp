import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRegData, IFormErrors, regData } from "../../../models/IRegistration"
import { authService } from "../../../services/authService"


interface regState {
    regData: IRegData;
    isValid: boolean,
    isAccept: boolean,
    formErrors: IFormErrors,
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
        "isSmsp": "",

        "regnum": "",
        "country": ""
    },
}


export const regSlice = createSlice({
    name: 'regData',
    initialState,
    reducers: {
        setRegDataProp: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.prop
            let reg: any = state.regData
            reg[prop] = action.payload.value;
        },
        setRegDataBool: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.prop
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
        setRegAccept: (state, action: PayloadAction<any>) => {
            state.isAccept = action.payload.checked
        },
    },
    extraReducers: (builder) => {
        builder
        .addMatcher(
            authService.endpoints.registration.matchFulfilled,
            (state, { payload }) => {
                //debugger
                //return payload
            }
        )
        
        
    },
})

export default regSlice.reducer;