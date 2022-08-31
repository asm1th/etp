import React, { FC, useState } from "react";
import { Tabs } from '@consta/uikit/Tabs';
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import EtapRow from "./EtapRow";
import EtapFooter from "./EtapFooter";
import KomandBar from "./KomandBar";
import { IconInfo } from '@consta/uikit/IconInfo';
import { Popover } from '@consta/uikit/Popover';
import { useAppSelector } from "../../hooks/redux";
import { IEtap } from "../../models/IMain"

const Etaps: FC = () => {
    const { etapsSumms } = useAppSelector(state => state.mainReducer)

    const [tab, setTab] = useState<IEtap>(etapsSumms[0]);

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
                className="tipPopover"
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
                        value={tab}
                        onChange={({ value }) => setTab(value)}
                        items={etapsSumms}
                        getLabel={(item) => "Этап " + item.id}
                        linePosition="right"
                    />
                    <Layout flex={1} className="TabsPageContainer" direction="column">
                        <Layout flex={1} direction="row" className="mb1 aib">
                            <Text as="div" className="label mr2">
                                Полное наименование этапа / услуги (работы)
                            </Text>
                            <Text as="div" className="labeltext">
                                {etapsSumms[tab.id-1].name}
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
                        <EtapRow etapId={tab.id}/>
                        <EtapFooter etapId={tab.id}/>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default Etaps;
