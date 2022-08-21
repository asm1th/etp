import React, { FC } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { Button } from "@consta/uikit/Button";
import { IconDownload } from "@consta/uikit/IconDownload";
import { useAppSelector } from "../../hooks/redux";
import { format } from "date-fns";


const TopBar: FC = () => {
    const {lot_name, participant_name, valuta, dateStartKP, dateEndKP} = useAppSelector(state => state.mainReducer)

    return (
        <>
            <Layout className="aic">
                <Layout flex={2} direction="column" className="mr1">
                    <Text as="div" className="label">
                        Предмет закупки
                    </Text>
                    <Text as="div" className="labeltext">
                        {lot_name}
                    </Text>
                </Layout>
                <Layout flex={3}>
                    <Layout flex={4} direction="column" className="mr1">
                        <Text as="div" className="label">
                            Участник анализа рынка
                        </Text>
                        <Text as="div" className="labeltext">
                            {participant_name}
                        </Text>
                    </Layout>
                    <Layout flex={1} direction="column" className="valBlock mr1">
                        <Text as="div" className="label">
                            Валюта
                        </Text>
                        <Text as="div" className="labeltext">
                            {valuta}
                        </Text>
                    </Layout>
                    <Layout flex={1} direction="column" className="mr1">
                        <Text as="div" className="label">
                            Дата запроса КП
                        </Text>
                        <Layout flex={1} className="aic">
                            <IconCalendar size="s" view="ghost" className="mr05"/>
                            <Text as="div" className="labeltext">
                                {format(dateStartKP, 'dd.MM.yyyy')}
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout flex={1} direction="column" className="mr1">
                        <Text as="div" className="label">
                            Срок приема КП
                        </Text>
                        <Layout flex={1} className="aic">
                            <IconCalendar size="s" view="ghost" className="mr05"/>
                            <Text as="div" className="labeltext">
                                {format(dateEndKP, 'dd.MM.yyyy')}
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout flex={1} direction="column">
                        <Button size="s" label="Скачать ТЗ" view="secondary" iconLeft={IconDownload} />
                    </Layout>
                </Layout>
            </Layout>

        </>
    );
};

export default TopBar;