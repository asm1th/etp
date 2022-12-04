
import React, { useState } from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/Layout";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './ZayavkaForm.css'
import { Checkbox } from '@consta/uikit/Checkbox';
import { TextField } from "@consta/uikit/TextField";
import { Select } from '@consta/uikit/Select';
import { DatePicker, DatePickerPropOnChange, DatePickerPropValue } from "@consta/uikit/DatePicker";
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { IconInfo } from '@consta/uikit/IconInfo';
import PopoverCustom from "../../util/PopoverCustom";
import { zakSlice } from "../../../store/reducers/zak/zakSlice";
import { format } from "date-fns";
import { Button } from "@consta/uikit/Button";
import { IconSave } from "@consta/uikit/IconSave";
import { IZakFormTab, IZakPrice } from "../../../store/reducers/zak/IZak";
import { validateTextFieldUtil } from "../../reg/validate";



type Item = {
    label: string
    id: string
};

const items: Item[] = [{
    label: 'Российский рубль',
    id: 'RUB',
}];

const ZayavkazakPrice = () => {
    const dispatch = useAppDispatch()
    const { zakPrice } = useAppSelector(state => state.zakReducer)

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined);

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };
    //

    const handleField = (e: any) => {
        dispatch(zakSlice.actions.setZakPrice({ prop: e.target.name, value: e.target.value }))
    }

    const handleFieldWaers = (e: any) => {
        dispatch(zakSlice.actions.setZakPrice({ prop: "waers", value: e.id }))
    }

    const msg = "При активном индикаторе расчет стоимости с учетом НДС выполняется автоматически"

    const getSelected = (List: any, value: string) => {
        return List[List.findIndex((List: any) => List.id === value)]
    }

    const [range1, setRange1] = useState<DatePickerPropValue<'date-range'>>([undefined, undefined]);
    const [range2, setRange2] = useState<[Date?, Date?] | null>(null);
    const handleFieldDate1: DatePickerPropOnChange<'date-range'> = ({ value }) => {
        setRange1(value);
        if (value && value[0] && value[0] !== undefined) { dispatch(zakSlice.actions.setZakPrice({ prop: "date_start_from", value: format(value[0], 'yyyy-MM-dd') })) }
        if (value && value[1] && value[1] !== undefined) { dispatch(zakSlice.actions.setZakPrice({ prop: "date_start_to", value: format(value[1], 'yyyy-MM-dd') })) }
    };
    const handleFieldDate2: DatePickerPropOnChange<'date-range'> = ({ value }) => {
        setRange2(value);
        if (value && value[0] && value[0] !== undefined) { dispatch(zakSlice.actions.setZakPrice({ prop: "date_end_from", value: format(value[0], 'yyyy-MM-dd') })) }
        if (value && value[1] && value[1] !== undefined) { dispatch(zakSlice.actions.setZakPrice({ prop: "date_end_to", value: format(value[1], 'yyyy-MM-dd') })) }
    };

    const handleCheckboxIsVat = (e: any) => {
        dispatch(zakSlice.actions.setZakPrice({ prop: e.e.target.name, value: e.checked }))
    }

    const sendPrice = () => {
        console.log(zakPrice);
        if (validatePrice()) {
            dispatch(zakSlice.actions.setZakFormTabValid({ tabId: 3, isValid: true }))
            alert("Данные сохранены. Можно отправлять заявку")
            dispatch(zakSlice.actions.setZakReady({ isReady: true }))
        } else {
            alert("Заполните все поля")
        }
    }

    const validatePrice = () => {
        let valid = false;
        valid = validateTextField("price", zakPrice.price, null)
        // &&
        // validatePhone("phone", zakForm.phone) &&
        // validateEmail() &&
        // validateTextField("address", zakForm.address, null)

        return valid
        //dispatch(regSlice.actions.setIsValid(valid))
    }

    const validateTextField = (prop: string, value: string, type: any) => {
        let res = validateTextFieldUtil(prop, value, type)
        // dispatch(zakSlice.actions.setZakPrice({ prop: prop, value: res.msg }))
        return res.isValid
    }


    return (
        <>
            <PopoverCustom position={position} text={msg} />
            <Text size="m" className="mb1 mt2">Ценовое предложение</Text>
            <Layout >
                <Layout direction="column">
                    <Select
                        name="vat"
                        label="Валюта"
                        placeholder="Выберите значение"
                        size="s"
                        items={items}
                        value={getSelected(items, zakPrice.waers)}
                        required={true}
                        onChange={({ value }) => handleFieldWaers(value)}
                    />
                    <TextField
                        name="price"
                        placeholder="Стоимость без НДС"
                        label="Стоимость без НДС"
                        size="s"
                        required={true}
                        value={zakPrice.price}
                        onChange={({ e }: any) => { handleField(e) }}
                        className="mt1"
                        width="full" />
                    <TextField
                        required={true}
                        name="price_vat"
                        placeholder="Стоимость c НДС"
                        label="Стоимость c НДС"
                        size="s"
                        value={zakPrice.price_vat}
                        onChange={({ e }: any) => { handleField(e) }}
                        className="mt1"
                        width="full" />
                </Layout>
                <Layout direction="column" className="ml2 mr2">
                    <DatePicker
                        required={true}
                        name="date_start_from"
                        value={range1}
                        onChange={handleFieldDate1}
                        labelPosition="top"
                        label="Начало приема"
                        leftSide={IconCalendar}
                        size="s"
                        type="date-range"
                        style={{ width: '250px' }} />
                    <DatePicker
                        required={true}
                        name="date_end_from"
                        value={range2}
                        onChange={handleFieldDate2}
                        labelPosition="top"
                        label="Начало приема"
                        leftSide={IconCalendar}
                        size="s"
                        type="date-range"
                        className="mt1"
                        style={{ width: '250px' }} />
                </Layout>
                <Layout direction="column">
                    <Layout className="aic">
                        <TextField
                            required={true}
                            name="full_price"
                            placeholder="Ставка НДС"
                            label="Ставка НДС"
                            size="s"
                            value={zakPrice.full_price}
                            onChange={({ e }: any) => { handleField(e) }}
                            className="mr1"
                        />
                        <Layout style={{ marginTop: '27px' }} className="aic">
                            <Checkbox
                                required={true}
                                name="is_vat"
                                label="Расчет НДС"
                                checked={zakPrice.is_vat}
                                onChange={(e: any) => handleCheckboxIsVat(e)}
                            />
                            <div onMouseMove={(e) => handleMouseMove(e)} onMouseLeave={() => setPosition(undefined)}>
                                <IconInfo size="s" view="ghost" className="infoPopoverIcon" />
                            </div>
                        </Layout>
                    </Layout>
                    <TextField
                        required={true}
                        name="full_price_vat"
                        placeholder="Сумма НДС"
                        label="Сумма НДС"
                        size="s"
                        value={zakPrice.full_price_vat}
                        onChange={({ e }: any) => { handleField(e) }}
                        className="mt1"
                    />

                </Layout>
            </Layout>
            <Button
                onClick={sendPrice}
                label="Сохранить требования"
                iconLeft={IconSave}
                className="mt1" />
        </>
    )
}

export default ZayavkazakPrice;

