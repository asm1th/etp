import React, { useState } from "react";
import { TextField } from "@consta/uikit/TextField";
import { Tabs } from '@consta/uikit/Tabs';
import { Text } from '@consta/uikit/Text';
import { Button } from "@consta/uikit/Button";
import { IconSave } from "@consta/uikit/IconSave";

import { zakSlice } from "../../../store/reducers/zak/zakSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './ZayavkaForm.css'
import PhoneInput from 'react-phone-number-input'
import ru from 'react-phone-number-input/locale/ru.json'
import ZayavkaFormCriterions from "./ZayavkaFormCriterions";
import ZayavkaFormDocs from "./ZayavkaFormDocs";
import ZayavkaFormPrice from "./ZayavkaFormPrice";




type Item = {
    name: string;
};

const items = [{
    name: 'Контактные данные'
}, {
    name: 'Информация по критериям'
}, {
    name: 'Документация по формам'
}, {
    name: 'Ценовое предложение'
}];

let formErrors: any = {
    'fio': "",
    'phone': "",
    'address': "",
    'email': ""
}

let isSaveButtonValid = false


const ZayavkaForm = () => {
    const dispatch = useAppDispatch()
    const [tab, setTab] = useState<Item>(items[0]);

    const { zakForm } = useAppSelector(state => state.zakReducer)

    const sendForm = () => {
        console.log(zakForm);
    }

    const validForm = (e: any) => {
        isSaveButtonValid = e.value !== '' && e.value !== null
        let prop: any = e.name
        formErrors[prop] = (e.value !== '' && e.value !== null) ? '' : 'Ошибка. Заполните это поле'
    }

    const handleField = (e: any) => {
        dispatch(zakSlice.actions.setZakForm({ prop: e.name, value: e.value }))
        validForm(e)
    }

    const handlePhoneField = (e: any) => {
        dispatch(zakSlice.actions.setZakForm({ prop: "phone", value: e }))
        validForm(e)
    }


    return (
        <>
            <Tabs
                value={tab}
                onChange={({ value }) => setTab(value)}
                items={items}
                getLabel={(item) => item.name}
                className="mb1"
            />
            <div style={{ display: tab.name === items[0].name ? 'block' : 'none' }} className="formContats">
                <Text size="l" className="mb1 mt2">Заполните данные контактного лица</Text>
                <TextField
                    className="mt1"
                    label="ФИО"
                    name="fio"
                    type="text"
                    placeholder="Введите ФИО"
                    width="full"
                    required
                    value={zakForm.fio}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.fio === "" ? undefined : "alert"}
                    caption={formErrors.fio}
                />
                {/* <TextField
                    className="mt1"
                    label="Телефон"
                    name="phone"
                    type="text"
                    placeholder="Введите телефон"
                    width="full"
                    required
                    value={zakForm.phone}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.phone === "" ? undefined : "alert"}
                    caption={formErrors.phone}
                /> */}
                <Text className="Text_size_m Text_view_secondary FieldLabel TextField-Label TextField-Label_labelPosition_top mt1">
                    Телефон
                    <span className="FieldLabel-Star">*</span>
                </Text>
                <PhoneInput
                    placeholder="Введите Телефон организации"
                    defaultCountry="RU"
                    initialValueFormat="national"
                    international
                    labels={ru}
                    className={`PhoneInput mt05 ${formErrors.phone && ('InputContainer_status_alert')}`}
                    name="phone"
                    value={zakForm.phone}
                    onChange={(e: any) => handlePhoneField(e)}
                />

                <TextField
                    className="mt1"
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Введите email"
                    width="full"
                    required
                    value={zakForm.email}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.email === "" ? undefined : "alert"}
                    caption={formErrors.email}
                />
                <TextField
                    className="mt1"
                    label="Адрес"
                    name="address"
                    type="textarea"
                    rows={7}
                    placeholder="Введите адрес"
                    width="full"
                    required
                    value={zakForm.address}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.address === "" ? undefined : "alert"}
                    caption={formErrors.address}
                />
            </div>
            <div style={{ display: tab.name === items[1].name ? 'block' : 'none' }}>
                <ZayavkaFormCriterions/>
            </div>
            <div style={{ display: tab.name === items[2].name ? 'block' : 'none' }}>
                <ZayavkaFormDocs/>
            </div>
            <div style={{ display: tab.name === items[3].name ? 'block' : 'none' }}>
                <ZayavkaFormPrice/>
            </div>
            <Button onClick={sendForm} label="Сохранить заявку" iconLeft={IconSave} className="mt1" />
        </>
    );
};

export default ZayavkaForm;