
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
import { format } from "date-fns";



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

    const handleFieldDate1 = (value:any) => {
        dispatch(zakSlice.actions.setZakPrice({ prop: "date_start_from", value: format(value[0], 'yyyy-MM-dd')}))
        dispatch(zakSlice.actions.setZakPrice({ prop: "date_start_to", value: format(value[1], 'yyyy-MM-dd')}))
    }
    const handleFieldDate2 = (value:any) => {
        dispatch(zakSlice.actions.setZakPrice({ prop: "date_end_from", value: format(value[0], 'yyyy-MM-dd')}))
        dispatch(zakSlice.actions.setZakPrice({ prop: "date_end_to", value: format(value[1], 'yyyy-MM-dd')}))
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
                        value={zakPrice.price}
                        onChange={({ e }: any) => { handleField(e) }}
                        className="mt1"
                        width="full" />
                    <TextField
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
                        name="date_start_from"
                        value={zakPrice.date_start_from ? [new Date(zakPrice.date_start_from), new Date(zakPrice.date_start_to)] : undefined}
                        onChange={({ value }) => handleFieldDate1(value)}
                        labelPosition="top"
                        label="Начало приема"
                        leftSide={IconCalendar}
                        size="s"
                        type="date-range"
                        style={{width: '250px'}}/>
                    <DatePicker
                        name="date_end_from"
                        value={zakPrice.date_start_from ? [new Date(zakPrice.date_end_from), new Date(zakPrice.date_end_to)] : undefined}
                        onChange={({ value }) => handleFieldDate2(value)}
                        labelPosition="top"
                        label="Начало приема"
                        leftSide={IconCalendar}
                        size="s"
                        type="date-range"
                        className="mt1" 
                        style={{width: '250px'}}/>
                </Layout>
                <Layout direction="column">
                    <Layout className="aic">
                        <TextField
                            placeholder="Ставка НДС"
                            label="Ставка НДС"
                            size="s"
                            value={zakPrice.vat}
                            onChange={({ e }: any) => { handleField(e) }}
                            className="mr1"
                        />
                        <Layout style={{marginTop: '27px'}} className="aic">
                            <Checkbox label="Расчет НДС" checked={zakPrice.isVat} />
                            <div onMouseMove={(e) => handleMouseMove(e)} onMouseLeave={() => setPosition(undefined)}>
                                <IconInfo size="s" view="ghost" className="infoPopoverIcon" />
                            </div>
                        </Layout>
                    </Layout>
                    <TextField
                        placeholder="Сумма НДС"
                        label="Сумма НДС"
                        size="s"
                        value={zakPrice.vat}
                        onChange={({ e }: any) => { handleField(e) }}
                        className="mt1"
                    />

                </Layout>
            </Layout>
        </>
    )
}

export default ZayavkazakPrice;

