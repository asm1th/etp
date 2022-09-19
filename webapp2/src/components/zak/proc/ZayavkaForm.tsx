import React, { useState } from "react";
import { Layout } from "@consta/uikit/LayoutCanary";
import { TextField } from "@consta/uikit/TextField";
import { Tabs } from '@consta/uikit/Tabs';
import { Text } from '@consta/uikit/Text';
import { Button } from "@consta/uikit/Button";
import { IconLock } from "@consta/uikit/IconLock";
import { zakSlice } from "../../../store/reducers/zak/zakSlice";
import { useAppDispatch } from "../../../hooks/redux";
import './ZayavkaForm.css'


const ZayavkaForm = () => {
    const dispatch = useAppDispatch()

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
    const [tab, setTab] = useState<Item>(items[0]);

    const handleField = (e: any) => {
        dispatch(zakSlice.actions.setZayavka({ prop: e.name, value: e.value }))

        validForm(e)
    }

    let zayavka = {
        fio: "",
        phone: "",
        address: "",
        email: ""
    }
    let formErrors = {
        'fio': "",
        'phone': "",
        'address': "",
        'email': ""
    }

    const sendForm = () => {
        console.log(zayavka);
    }

    let isSaveButtonValid = false

    const validForm = (e:any) => {
        isSaveButtonValid = e.value !== '' && e.value !== null
        //formErrors[e.name] = (e.value !== '' && e.value !== null) ? '' : 'Ошибка. Заполните это поле'
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
                <Text size="m" className="mb1 mt2">Заполните данные контактного лица</Text>
                <TextField
                    className="mt1"
                    label="ФИО"
                    name="fio"
                    type="text"
                    placeholder="Введите ФИО"
                    width="full"
                    required
                    value={zayavka.fio}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.fio === "" ? undefined : "alert"}
                    caption={formErrors.fio}
                />
                <TextField
                    className="mt1"
                    label="Телефон"
                    name="phone"
                    type="text"
                    placeholder="Введите телефон"
                    width="full"
                    required
                    value={zayavka.phone}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.phone === "" ? undefined : "alert"}
                    caption={formErrors.phone}
                />
                <TextField
                    className="mt1"
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Введите email"
                    width="full"
                    required
                    value={zayavka.email}
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
                    value={zayavka.address}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.address === "" ? undefined : "alert"}
                    caption={formErrors.address}
                />
                <Button onClick={sendForm} label="Сохранить контактные данные" disabled={true} iconLeft={IconLock} className="mt1" />
            </div>
            <div style={{ display: tab.name === items[1].name ? 'block' : 'none' }}>
                <Text size="m" className="mb1">1</Text>

            </div>
            <div style={{ display: tab.name === items[2].name ? 'block' : 'none' }}>
                <Text size="m" className="mb1">2</Text>

            </div>
            <div style={{ display: tab.name === items[3].name ? 'block' : 'none' }}>
                <Text size="m" className="mb1">3</Text>

            </div>

        </>
    );
};

export default ZayavkaForm;