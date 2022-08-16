import React, { FC, useState } from "react";
import { Tabs } from '@consta/uikit/Tabs';
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import EtapRow from "./EtapRow";
import EtapFooter from "./EtapFooter";
import KomandBar from "./KomandBar";
import { IconInfo } from '@consta/uikit/IconInfo';
import { Popover } from '@consta/uikit/Popover';

const Etaps: FC = () => {
    type Item = string;
    const items: Item[] = ['1 этап', '2 этап', '3 этап'];
    const [tabs, setTabs] = useState<Item | null>(items[0]);

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined);

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };
    //

    return (
        <>
            <Popover
                direction="rightCenter"
                spareDirection="downStartLeft"
                offset="xl"
                arrowOffset={0}
                //onClickOutside={action('onClickOutside')}
                isInteractive={false}
                position={position}
            >
                {(direction) => (
                    <div>
                        <Text size="xs">
                            Введение альтернативного наименования<br /> расценки заполняется (при необходимости)<br />при нажатии на иконку “Редактирование”. <br />Указывается другое наименование расценки<br />(отличное от исходной), но сопоставимое<br /> по функционалу.
                        </Text>
                    </div>
                )}
            </Popover>
            <Layout className="TabsPage" direction="column">
                <KomandBar />
                <Layout>
                    <Tabs
                        className="Tabs"
                        value={tabs}
                        onChange={({ value }) => setTabs(value)}
                        items={items}
                        getLabel={(item) => item}
                        linePosition="right"
                    />
                    <Layout flex={1} className="TabsPageContainer" direction="column">
                        <Layout flex={1} direction="row" className="mb1 aic">
                            <Text as="div" className="label mr2">
                                Полное наименование этапа / услуги (работы)
                            </Text>
                            <Text as="div" className="labeltext">
                                Разработка документации
                            </Text>
                        </Layout>
                        <Layout>
                            <Text as="div" className="Title mb1">
                                Состав этапа / услуги (работы)
                            </Text>
                        </Layout>
                        <Layout className="Header">
                            <Layout flex={3} className="tar">
                                <Text className="label">
                                    Наименование расценки
                                </Text>
                                <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                                    <IconInfo size="s" view="ghost" />
                                </div>
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
                        <EtapRow />
                        <EtapFooter />
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default Etaps;