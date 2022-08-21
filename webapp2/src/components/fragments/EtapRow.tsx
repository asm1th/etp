import React, { FC, useState } from "react";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Button } from '@consta/uikit/Button';
import { IconTeam } from '@consta/uikit/IconTeam';
import { IconClose } from '@consta/uikit/IconClose';
import { Select } from '@consta/uikit/Select';

const EtapRow: FC = () => {

    const [value, setValue] = useState("Архитектор");
    const handleChange = ({ value }: any) => {
        setValue(value);
    }
    const [valueSub, setValueSub] = useState("Специалист по документации");
    const handleChangeSub = ({ value }: any) => {
        setValueSub(value);
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
    const [val, setVal] = useState<Item | null>(ei[0]);

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
    const [nds, setNds] = useState<Item | null>(ndsList[1]);
    //
    const [Summ, setSumm] = useState("-- --");
    const [SummPlusNds, setSummPlusNds] = useState("-- --");
    //
    const Statia = "указать статью";

    return (
        <>
            <Layout className="Row">
                <Layout flex={3} direction="column">
                    <Layout>
                        <TextField
                            onChange={handleChange}
                            value={value}
                            size="s"
                            className="mr05"
                            width="full"
                            disabled
                        />
                        <Button 
                            className="mr1"
                            iconRight={IconTeam} 
                            iconSize="s" 
                            size="s" 
                            onlyIcon={true} 
                            view="clear" />
                    </Layout>
                    
                </Layout>
                <Layout flex={1}>
                    <Select
                        placeholder="Валюта"
                        view="default"
                        items={ei}
                        value={val}
                        onChange={({ value }) => setVal(value)}
                        labelPosition="left"
                        size="s"
                        className="RowInput" />
                </Layout>
                <Layout flex={1}>
                    <TextField value="50,00" size="s" className="RowInput" />
                </Layout>
                <Layout flex={1}>
                    <TextField value="Стоимость" size="s" className="RowInput" />
                </Layout>
                <Layout flex={1}>
                    <Select
                        view="default"
                        items={ndsList}
                        value={nds}
                        onChange={({ value }) => setNds(value)}
                        labelPosition="left"
                        size="s"
                        className="RowInput" />
                </Layout>

                <Layout flex={1} className="aic jcc">{Summ}</Layout>
                <Layout flex={1} className="aic jcc">{SummPlusNds}</Layout>
            </Layout>

            <Layout className="Row subRow mt05">
                <Layout flex={3}>
                    <Layout>
                        <TextField
                            onChange={handleChangeSub}
                            value={valueSub}
                            size="s"
                            className="mr05"
                            width="full"
                        />
                        <Button 
                            className="mr1"
                            iconRight={IconClose} 
                            iconSize="s" 
                            size="s" 
                            onlyIcon={true} 
                            view="clear" />
                    </Layout>
                </Layout>
                <Layout flex={6} className="aic acc">
                    {/* <Text 
                        as="div" 
                        className="mr1" 
                        size="s">
                        Стоимость предложения не облагается НДС, в соответствии со статьей
                    </Text> */}
                    <TextField
                        label="Стоимость предложения не облагается НДС, в соответствии со статьей"
                        placeholder="Введите стоимость"
                        size="xs"
                        labelPosition="left"
                        value={Statia}
                        required
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
    );
};

export default EtapRow;

