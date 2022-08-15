import React, { FC } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { Button } from "@consta/uikit/Button";
import { IconDownload } from "@consta/uikit/IconDownload";


const TopBar: FC = () => {

    return (
        <div>
            <Layout className="TopBar">
                <Layout flex={2} direction="column">
                    <Text as="div" className="label">
                        Предмет закупки
                    </Text>
                    <Text as="div" className="labeltext">
                        Разработка системы по проведению Закупочных процедур
                    </Text>
                </Layout>
                <Layout flex={3}>
                    <Layout flex={2} direction="column">
                        <Text as="div" className="label">
                            Участник анализа рынка
                        </Text>
                        <Text as="div" className="labeltext">
                            АО “Софлайн Солюшн”
                        </Text>
                    </Layout>
                    <Layout flex={1} direction="column" className="valBlock">
                        <Text as="div" className="label">
                            Валюта
                        </Text>
                        <Text as="div" className="labeltext">
                            RUB
                        </Text>
                    </Layout>
                    <Layout flex={1} direction="column">
                        <Text as="div" className="label">
                            Дата запроса КП
                        </Text>
                        <Layout flex={1}>
                            <IconCalendar size="s" view="ghost" />
                            <Text as="div" className="labeltext">
                                31.08.2022
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout flex={1} direction="column">
                        <Text as="div" className="label">
                            Срок приема КП
                        </Text>
                        <Layout flex={1}>
                            <IconCalendar size="s" view="ghost" />
                            <Text as="div" className="labeltext">
                                10.09.2022
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout flex={1} direction="column">
                        <Button label="Скачать ТЗ" view="secondary" iconLeft={IconDownload} />
                    </Layout>
                </Layout>
            </Layout>

        </div>
    );
};

export default TopBar;