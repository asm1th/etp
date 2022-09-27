import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IZak } from "./IZak";
import { procList, zakForm, criterions, docs, zakPrice, zakFormErrors, zakFormTabs } from "./zakData"

export const initialState: IZak = {
    procList: procList,
    zakForm: zakForm,
    zakFormErrors: zakFormErrors,
    zakFormTabs: zakFormTabs,
    zakFormCurrentTab: zakFormTabs[0],
    criterions: criterions,
    docs: docs,
    zakPrice: zakPrice,
    isZakReadyToSend: false
}

type ITab = {
    tabId: number
    isValid: boolean
}

export const zakSlice = createSlice({
    name: 'zakData',
    initialState,
    reducers: {
        setToggleSidebar: (state) => {
            
        },
        setZakForm: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.prop
            let zakForm: any = state.zakForm
            zakForm[prop] = action.payload.value;
        },
        setZakPrice: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.prop
            let zakPrice: any = state.zakPrice
            zakPrice[prop] = action.payload.value;
        },
        setZakFormError: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.prop
            let zakFormErrors: any = state.zakFormErrors
            zakFormErrors[prop] = action.payload.value;
        },
        setZakFormTabValid: (state, action: PayloadAction<ITab>) => {
            state.zakFormTabs[action.payload.tabId].isValid = action.payload.isValid;
        },
        setZakFormCurrentTab: (state, action: PayloadAction<any>) => {
            state.zakFormCurrentTab = action.payload.tab;
        },
        setZakReady: (state, action: PayloadAction<{isReady:boolean}>) => {
            state.isZakReadyToSend = action.payload.isReady;
        },
    },
    extraReducers: {},
})

export default zakSlice.reducer;