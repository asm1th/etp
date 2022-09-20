
import React, { useState } from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/LayoutCanary";
import { Button } from "@consta/uikit/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './ZayavkaForm.css'
import { Checkbox } from '@consta/uikit/Checkbox';
import { TextField } from "@consta/uikit/TextField";
import { Select } from '@consta/uikit/Select';

type Item = {
    label: string;
    id: number;
};

const items: Item[] = [{
    label: 'Да',
    id: 1,
}, {
    label: 'Нет',
    id: 2,
}];

const ZayavkaFormPrice = () => {
    const { formPrice } = useAppSelector(state => state.zakReducer)
    const [answer, setAnswer] = useState<Item | null>();

    const handleField = (e: any) => {

    }

    return (
        <>
            <Text size="m" className="mb1 mt2">Ценовое предложение</Text>
            <Select
                label="Ответ"
                placeholder="Выберите значение"
                size="s"
                items={items}
                value={answer}
                required={true}
                onChange={({ value }) => setAnswer(value)}
            />
            <TextField
                placeholder="Стоимость без НДС"
                label="Стоимость без НДС"
                size="s"
                value={formPrice.price}
                onChange={({ e }: any) => { handleField(e) }} 
                className="mt1"/>
        </>
    )
}

export default ZayavkaFormPrice;

