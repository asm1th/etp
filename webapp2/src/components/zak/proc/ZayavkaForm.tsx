import React from "react";
import { TextField } from "@consta/uikit/TextField";
import { cnTabsTab, Tabs } from '@consta/uikit/Tabs';
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
import { IconCheck } from "@consta/uikit/IconCheck";
import { IconClose } from "@consta/uikit/IconClose";
import { IZakForm, IZakFormTab } from "../../../store/reducers/zak/IZak";
import { validateEmailUtil, validateTextFieldUtil } from "../../reg/validate";


let isSaveValid = true

const ZayavkaForm = () => {
    const dispatch = useAppDispatch()
    const { zakForm, zakFormErrors, zakFormTabs, zakFormCurrentTab } = useAppSelector(state => state.zakReducer)
    //const [tab, setTab] = useState<IZakFormTab>(items[0]);

    const handleField = (e: any) => {
        dispatch(zakSlice.actions.setZakForm({ prop: e.name, value: e.value }))

    }

    const handlePhoneField = (e: any) => {
        dispatch(zakSlice.actions.setZakForm({ prop: "phone", value: e }))

    }

    const validateForm = (zakForm: IZakForm) => {
        let valid = false;
        valid = validateTextField("fio", zakForm.fio, null) &&
            validatePhone("phone", zakForm.phone) &&
            validateEmail() &&
            validateTextField("address", zakForm.address, null)

        return valid
        //dispatch(regSlice.actions.setIsValid(valid))
    }

    const validateTextField = (prop: string, value: string, type: any) => {
        let res = validateTextFieldUtil(prop, value, type)
        dispatch(zakSlice.actions.setZakFormError({ prop: prop, value: res.msg }))
        return res.isValid
    }

    const validateEmail = () => {
        let res = validateEmailUtil(zakForm.email)
        dispatch(zakSlice.actions.setZakFormError({ prop: "email", value: res.msg }))
        return res.isValid
    }

    const validatePhone = (prop: string, value: string) => {
        let result = false;
        const minLen = 3;
        let iffer = value && value.length >= minLen

        if (iffer) {
            result = true;
            dispatch(zakSlice.actions.setZakFormError({ prop: prop, value: "" }))
        } else {
            dispatch(zakSlice.actions.setZakFormError({ prop: prop, value: "Ошибка! Не правильный телефон" }))
        }
        console.log("validateTextField:" + result);
        return result
    }

    const sendContacts = () => {
        console.log(zakForm);
        if (validateForm(zakForm)) {
            // следующая вкладка
            dispatch(zakSlice.actions.setZakFormTabValid({ tabId: 0, isValid: true }))
            alert("Данные сохранены")
            setTab(zakFormTabs[1])
        }
    }

    const setTab = (tab:IZakFormTab) => {
        dispatch(zakSlice.actions.setZakFormCurrentTab({ tab: tab }))
    }

    //TabsTab TabsTab_size_m TabsTab_checked MixFocus MixFocus_before
    //TabsTab TabsTab_checked notValid
    return (
        <>
            <Tabs
                value={zakFormCurrentTab}
                onChange={({ value }) => setTab(value)}
                items={zakFormTabs}
                getLabel={(item) => item.name}
                className="mb1"
                renderItem={({ item, onChange, checked }) => (
                    <button type="button" onClick={onChange} className={`TabsTab_size_m   ${cnTabsTab({ checked })} ${item.isValid ? 'valid' : 'notValid'}`}>

                        {item.name}
                        {item.isValid ? (
                            <IconCheck size="s" className="ml05" />
                        ) : (
                            <IconClose size="s" className="ml05" />
                        )}

                    </button>
                )}
            />
            <div style={{ display: zakFormCurrentTab.name === zakFormTabs[0].name ? 'block' : 'none' }} className="formContats">
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
                    status={zakFormErrors.fio === "" ? undefined : "alert"}
                    caption={zakFormErrors.fio}
                />
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
                    className={`PhoneInput mt05 ${zakFormErrors.phone && ('InputContainer_status_alert')}`}
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
                    status={zakFormErrors.email === "" ? undefined : "alert"}
                    caption={zakFormErrors.email}
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
                    status={zakFormErrors.address === "" ? undefined : "alert"}
                    caption={zakFormErrors.address}
                />
                <Button
                    disabled={!isSaveValid}
                    onClick={sendContacts}
                    label="Сохранить контакты"
                    iconLeft={IconSave}
                    className="mt1" />
            </div>
            <div style={{ display: zakFormCurrentTab.name === zakFormTabs[1].name ? 'block' : 'none' }}>
                <ZayavkaFormCriterions />
            </div>
            <div style={{ display: zakFormCurrentTab.name === zakFormTabs[2].name ? 'block' : 'none' }}>
                <ZayavkaFormDocs />
            </div>
            <div style={{ display: zakFormCurrentTab.name === zakFormTabs[3].name ? 'block' : 'none' }}>
                <ZayavkaFormPrice />
            </div>

        </>
    );
};

export default ZayavkaForm;