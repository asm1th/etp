import React, { FC, useState } from "react";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Button } from '@consta/uikit/Button';
import { IconTeam } from '@consta/uikit/IconTeam';
import { IconClose } from '@consta/uikit/IconClose';
import { Select } from '@consta/uikit/Select';
import { useAppSelector } from "../../hooks/redux";

const EtapRow: FC = () => {
    const { etaps } = useAppSelector(state => state.mainReducer)

    const handleChange = ({ value }: any) => {
        //universal function
    }

    const onChangeNds = ({ value }: any) => {
        //universal function
    }

    const handleChangeSub = ({ value }: any) => {
        //universal function
    }

    const handleChangeEI = ({ value }: any) => {
        //universal function
    }
    const handleChangeSubClose = ({ value }: any) => {
        //universal function
    }

    type Item = {
        label: string;
        id: number;
    };
    const ei: Item[] = [
        {
            label: 'Ч/Ч (чел.час)',
            id: 1,
        }
    ];

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
            label: '0%',
            value: 0,
            id: 3,
        },
        {
            label: 'без НДС',
            value: null,
            id: 4,
        }

    ];


    return (
        <>
            {etaps.map(({ id, name, summ, summ_nds, ei_id, ei_name, ei_value, ei_price, nds, sub }) => (
                <>
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
                                    onChange={handleChangeSub}
                                />
                            </Layout>
                        </Layout>
                        <Layout flex={1}>
                            <Select
                                placeholder="Выберите ЕИ"
                                view="default"
                                items={ei}
                                value={ei[ei_id]}
                                labelPosition="left"
                                size="s"
                                className="RowInput" 
                                onChange={handleChangeEI}/>
                        </Layout>
                        <Layout flex={1}>
                            <TextField 
                                name="ei_value"
                                value={ei_value} 
                                size="s" 
                                className="RowInput" />
                        </Layout>
                        <Layout flex={1}>
                            <TextField 
                                name="ei_price"
                                value={ei_price} 
                                size="s" 
                                className="RowInput" />
                        </Layout>
                        <Layout flex={1}>
                            <Select
                                view="default"
                                items={ndsList}
                                value={ndsList[nds]}
                                labelPosition="left"
                                size="s"
                                className="RowInput" 
                                onChange={onChangeNds}/>
                        </Layout>

                        <Layout flex={1} className="aic jcc">{summ}</Layout>
                        <Layout flex={1} className="aic jcc">{summ_nds}</Layout>
                    </Layout>

                    {sub.isSub ? (
                        <>
                            <Layout className="Row subRow mt05">
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
                                            onChange={handleChangeSubClose}
                                        />
                                    </Layout>
                                </Layout>
                                <Layout flex={6} className="aic acc">
                                    
                                    <TextField
                                        name="sub.statia"
                                        label="Стоимость предложения не облагается НДС, в соответствии со статьей"
                                        placeholder="указать статью"
                                        size="xs"
                                        labelPosition="left"
                                        value={sub.statia}
                                        required
                                        onChange={handleChange}
                                        />
                                    <Text 
                                        as="div"
                                        className="ml1" 
                                        size="s">
                                        НК РФ
                                    </Text>
                                </Layout>
                            </Layout>
                        </>
                    ) : null}
                    
                </>
            ))}

        </>
    );
};

export default EtapRow;

