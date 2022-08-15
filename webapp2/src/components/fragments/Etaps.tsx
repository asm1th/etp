import React, { FC, useState } from "react";
import { Tabs } from '@consta/uikit/Tabs';
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";

const Etaps: FC = () => {
    type Item = string;
    const items: Item[] = ['этап', 'этап', 'этап'];
    const [value, setValue] = useState<Item | null>(items[0]);

    const [item, setItem] = useState(null);
    const handleChange = ({ value } : {value:string}) => setItem(value);

    return (
        <>
            <Layout className="TabsPage">
                <Tabs
                    className="Tabs"
                    value={value}
                    onChange={({ value }) => setValue(value)}
                    items={items}
                    getLabel={(item) => item}
                    linePosition="right"
                />
                <Layout flex={1} className="TabsPageContainer" direction="column">
                    <Layout flex={1} direction="row" >
                        <Text as="div" className="label mr2">
                            Полное наименование этапа / услуги (работы)
                        </Text>
                        <Text as="div" className="labeltext">
                            Разработка документации
                        </Text>
                    </Layout>
                    <Layout>
                        <Text as="div" className="Title">
                            Состав этапа / услуги (работы)
                        </Text>
                    </Layout>
                    <Layout className="Header">
                        <Layout flex={2}>
                            <Text >Наименование расценки</Text>
                        </Layout>
                        <Layout flex={1}>
                            <Text className="label" align="center">Единица измерения (ЕИ)</Text>
                        </Layout>
                        <Layout flex={1}>
                            <Text className="label" align="center">Количество ЕИ</Text>
                        </Layout>
                        <Layout flex={1}>
                            <Text className="label" align="center">Стоимость ЕИ</Text>
                        </Layout>
                        <Layout flex={1}>
                            <Text className="label" align="center">Ставка НДС</Text>
                        </Layout>
                        <Layout flex={1}>
                            <Text className="label" align="center">Сумма без НДС</Text>
                        </Layout>
                        <Layout flex={1}>
                            <Text className="label" align="center">Сумма с НДС</Text>
                        </Layout>
                    </Layout>
                    <Layout className="Row">
                        <Layout flex={2}>
                            <TextField onChange={handleChange} value={item} />
                        </Layout>
                        <Layout flex={1}>
                            
                            
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default Etaps;
