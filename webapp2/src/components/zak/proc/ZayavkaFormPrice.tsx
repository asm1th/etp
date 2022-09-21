
import React, { useState } from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/LayoutCanary";
import { Button } from "@consta/uikit/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './ZayavkaForm.css'
import { Checkbox } from '@consta/uikit/Checkbox';
import { TextField } from "@consta/uikit/TextField";
import { Select } from '@consta/uikit/Select';
import { DatePicker } from "@consta/uikit/DatePickerCanary";
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { IconInfo } from '@consta/uikit/IconInfo';
import PopoverCustom from "../../util/PopoverCustom";
import { zakSlice } from "../../../store/reducers/zak/zakSlice";



type Item = {
    label: string;
    id: number;
};

const items: Item[] = [{
    label: 'Rub',
    id: 1,
}, {
    label: 'USD',
    id: 2,
}];

const ZayavkaFormPrice = () => {
    const dispatch = useAppDispatch()
    const { formPrice } = useAppSelector(state => state.zakReducer)

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined);

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };
    //

    const handleField = (e: any) => {
        dispatch(zakSlice.actions.setZakForm({ prop: e.name, value: e.value }))
    }

    const handleFieldWaers = (e: any) => {

    }

    const msg = "Подсказка"

    const getSelected = (List: any, value: string) => {
        return List[List.findIndex((List: any) => List.id === value)]
    }

    const handleFieldDate = (e: any) => {

    }


    return (
        <>
            <PopoverCustom position={position} text={msg} />
            <Layout >
                <Layout direction="column" className="ml2">
                    <Text size="m" className="mb1 mt2">Ценовое предложение</Text>
                    <Select
                        name="vat"
                        label="Валюта"
                        placeholder="Выберите значение"
                        size="s"
                        items={items}
                        value={getSelected(items, formPrice.waers)}
                        required={true}
                        onChange={({ value }) => handleFieldWaers(value)}

                    />
                    <TextField
                        name="price"
                        placeholder="Стоимость без НДС"
                        label="Стоимость без НДС"
                        size="s"
                        value={formPrice.price}
                        onChange={({ e }: any) => { handleField(e) }}
                        className="mt1"
                        width="full" />
                    <TextField
                        name="price_vat"
                        placeholder="Стоимость c НДС"
                        label="Стоимость c НДС"
                        size="s"
                        value={formPrice.price_vat}
                        onChange={({ e }: any) => { handleField(e) }}
                        className="mt1"
                        width="full" />
                </Layout>
                <Layout direction="column" className="ml2">
                    <DatePicker
                        name="date_start_from"
                        value={formPrice.date_start_from ? [new Date(formPrice.date_start_from), new Date(formPrice.date_start_to)] : undefined}
                        onChange={({ value }) => handleFieldDate(value)}
                        labelPosition="top"
                        label="Начало приема"
                        leftSide={IconCalendar}
                        size="s"
                        type="date-range"
                        className="mt1" />
                    <DatePicker
                        name="date_end_from"
                        value={formPrice.date_start_from ? [new Date(formPrice.date_end_from), new Date(formPrice.date_end_to)] : undefined}
                        onChange={({ value }) => handleFieldDate(value)}
                        labelPosition="top"
                        label="Начало приема"
                        leftSide={IconCalendar}
                        size="s"
                        type="date-range"
                        className="mt1" />
                </Layout>
                <Layout direction="column">
                    <Layout>
                        <TextField
                            placeholder="Ставка НДС"
                            label="Ставка НДС"
                            size="s"
                            value={formPrice.vat}
                            onChange={({ e }: any) => { handleField(e) }}
                            className="mt1"
                        />
                        <Checkbox label="Расчет НДС" checked={formPrice.isVat} />
                        <div onMouseMove={(e) => handleMouseMove(e)} onMouseLeave={() => setPosition(undefined)}>
                            <IconInfo size="s" view="ghost" className="infoPopoverIcon" />
                        </div>
                    </Layout>
                    <TextField
                        placeholder="Сумма НДС"
                        label="Сумма НДС"
                        size="s"
                        value={formPrice.vat}
                        onChange={({ e }: any) => { handleField(e) }}
                        className="mt1"
                    />

                </Layout>
            </Layout>
        </>
    )
}

export default ZayavkaFormPrice;

