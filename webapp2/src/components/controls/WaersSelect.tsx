import { FC, useState } from "react";
import { Select } from '@consta/uikit/Select';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const WaersSelect: FC = () => {
    const dispatch = useAppDispatch()
    const {waers} = useAppSelector(state => state.sampReducer)

    type Item = {
        label: string;
        id: number;
    };
    
    const waersList: Item[] = [
        {
            label: 'RUB',
            id: 1,
        },
        {
            label: 'USD',
            id: 2,
        },
        // {
        //     label: 'YUN',
        //     id: 3,
        // },
    ];
    const waersIndex = waersList.findIndex(waersList => waersList.label === waers)
    const [waersSelected, setWaersSelected] = useState<Item | null>(waersList[waersIndex]);
    
    return (
        <Select
            placeholder="Валюта"
            view="default"
            items={waersList}
            value={waersSelected}
            onChange={({ value }) => setWaersSelected(value)}
            labelPosition="left"
            label="Валюта"
            style={{ width: '165px' }}
            size="s"
            className="valSelect mr1" />
    )
}

export default WaersSelect;