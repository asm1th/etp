import React, { FC, useState } from "react";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Button } from '@consta/uikit/Button';
import { IconTeam } from '@consta/uikit/IconTeam';
import { IconClose } from '@consta/uikit/IconClose';
import { Select } from '@consta/uikit/Select';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { mainSlice } from "../../store/reducers/main/mainSlice";
import { IEtapItem } from "../../models/IMainData";


const EtapRow: FC = () => {
    const dispatch = useAppDispatch()
    const { etapItems } = useAppSelector(state => state.mainReducer)

    const handleChange = (value: any) => {
        alert("handleChange")
    }

    const handleSubToggle = (etapItemId: number) => {
        const etapItemIndex = etapItems.findIndex(etapItems => etapItems.id === etapItemId)
        dispatch(mainSlice.actions.toggleEtapRowSub(etapItemIndex))
    }

    const handleChangeEI = (etapItemId: number, value: number) => {
        dispatch(mainSlice.actions.setEtapEI({ etapItemId: etapItemId, value: value }))
    }

    const handleChangeEtapEIValue = (etapItemId: number, value: string) => {
        dispatch(mainSlice.actions.setEtapEIValue({ etapItemId: etapItemId, value: value }))
    }

    const handleChangeEtapEIPRICEValue = (etapItemId: number, value: string) => {
        dispatch(mainSlice.actions.setEtapEIPrice({ etapItemId: etapItemId, value: value }))
    }

    const handleChangeEtapNDS = (etapItemId: number, value: number) => {
        dispatch(mainSlice.actions.setEtapNDS({ etapItemId: etapItemId, value: value }))
    }


    type Item = {
        label: string;
        id: number;
    };
    const eiList: Item[] = [{
        label: 'Ч/Ч (чел.час)',
        id: 1,
    }];

    type ndsItem = {
        label: string;
        id: number;
        value: number | null;
    };
    const ndsList: ndsItem[] = [
        {
            label: '20%',
            value: 20,
            id: 1,
        },
        {
            label: '10%',
            value: 10,
            id: 2,
        },
        {
            label: 'без НДС',
            value: null,
            id: 4,
        }

    ];

    const getSelected = (List: any, id: any) => {
        return List[List.findIndex((List: any) => List.id === id)]
    }

    const getSelectedNDS = (List: any, nds: number) => {
        return List[List.findIndex((List: any) => List.value === nds)]
    }

    return (
        <>
            {etapItems.map(({ id, name, summ, summ_nds, ei_id, ei_name, ei_value, ei_price, nds, sub }) => (
                <div key={id}>
                    <Layout className="Row mb1">
                        <Layout flex={3} direction="column">
                            <Layout>
                                <TextField
                                    name="name"
                                    value={name}
                                    size="s"
                                    className="mr05"
                                    width="full"
                                    disabled
                                    onChange={handleChange}
                                />
                                <Button
                                    className="mr1"
                                    iconRight={IconTeam}
                                    iconSize="s"
                                    size="s"
                                    onlyIcon={true}
                                    view="clear"
                                    onClick={() => handleSubToggle(id)}
                                />
                            </Layout>
                        </Layout>
                        <Layout flex={1}>
                            <Select
                                placeholder="Выберите ЕИ"
                                view="default"
                                items={eiList}
                                value={getSelected(eiList, ei_id)}
                                labelPosition="left"
                                size="s"
                                className="RowInput"
                                onChange={({ value }) => handleChangeEI(id, value)}
                            />
                        </Layout>
                        <Layout flex={1}>
                            <TextField
                                name="ei_value"
                                value={ei_value}
                                size="s"
                                className="RowInput"
                                onChange={({ e }: any) => handleChangeEtapEIValue(id, e.target.value)}
                            />
                        </Layout>
                        <Layout flex={1}>
                            <TextField
                                name="ei_price"
                                value={ei_price}
                                size="s"
                                className="RowInput"
                                onChange={({ e }: any) => handleChangeEtapEIPRICEValue(id, e.target.value)} />
                        </Layout>
                        <Layout flex={1}>
                            <Select
                                view="default"
                                items={ndsList}
                                //value={ndsList[nds]}
                                value={getSelectedNDS(ndsList, nds)}
                                labelPosition="left"
                                size="s"
                                className="RowInput"
                                onChange={({ value }) => handleChangeEtapNDS(id, value)} />
                        </Layout>

                        <Layout flex={1} className="aic jcc">{summ}</Layout>
                        <Layout flex={1} className="aic jcc">{summ_nds}</Layout>
                        
                    </Layout>

                    {sub.isSub ? (
                        <>
                            <Layout className="Row subRow mt05 mb2">
                                <Layout flex={3}>
                                    <Layout>
                                        <TextField
                                            name="sub.name"
                                            value={sub.name}
                                            size="s"
                                            className="mr05"
                                            width="full"
                                            onChange={handleChange}
                                        />
                                        <Button
                                            className="mr1"
                                            iconRight={IconClose}
                                            iconSize="s"
                                            size="s"
                                            onlyIcon={true}
                                            view="clear"
                                            onClick={() => handleSubToggle( id )}
                                        />
                                    </Layout>
                                </Layout>
                                <Layout flex={6} className="aic acc">
                                    <Text as="div" className="mr1" size="xs">
                                        Стоимость предложения не облагается НДС, в соответствии со статьей
                                    </Text>
                                    <TextField
                                        name="sub.statia"
                                        placeholder="Указать статью"
                                        size="xs"
                                        labelPosition="left"
                                        value={sub.statia}
                                        required
                                        onChange={handleChange}
                                        style={{ width: '100px' }} />
                                    <Text
                                        as="div"
                                        className="ml1"
                                        size="xs">
                                        НК РФ
                                    </Text>
                                </Layout>
                            </Layout>
                        </>
                    ) : null}
                </div>
            ))}
        </>
    );
};

export default EtapRow;

