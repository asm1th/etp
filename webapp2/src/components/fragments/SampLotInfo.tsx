import React, { FC } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { IconExit } from '@consta/uikit/IconExit';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { IconDownload } from "@consta/uikit/IconDownload";
import { useAppSelector } from "../../hooks/redux";
import { format } from "date-fns";


const SampLotInfo: FC = () => {
    const {lot_name, links, waers, kp_accep_date, kp_send_date} = useAppSelector(state => state.sampReducer)

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
                            {links.info_ka_name}
                        </Text>
                    </Layout>
                    <Layout flex={1} direction="column" className="valBlock mr1">
                        <Text as="div" className="label">
                            Валюта
                        </Text>
                        <Text as="div" className="labeltext">
                            {waers}
                        </Text>
                    </Layout>
                    <Layout flex={1} direction="column" className="mr2">
                        <Text as="div" className="label">
                            Дата запроса КП
                        </Text>
                        <Layout flex={1} className="aic">
                            <IconCalendar size="s" view="ghost" className="mr05"/>
                            <Text as="div" className="labeltext">
                                {format(new Date(kp_send_date), 'dd.MM.yyyy')}
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout flex={1} direction="column" className="mr2">
                        <Text as="div" className="label">
                            Срок приема КП
                        </Text>
                        <Layout flex={1} className="aic">
                            <IconCalendar size="s" view="ghost" className="mr05"/>
                            <Text as="div" className="labeltext">
                                {format(new Date(kp_accep_date), 'dd.MM.yyyy')}
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout flex={1} direction="row">
                        <Button 
                            disabled={true}
                            size="m" 
                            label="Скачать ТЗ" 
                            view="secondary" 
                            iconLeft={IconDownload} />
                    
                        <Button 
                            disabled={true}
                            size="m" 
                            view="secondary" 
                            onlyIcon={true}
                            iconLeft={IconExit} 
                            className="ml1"/>
                    </Layout>
                </Layout>
            </Layout>

        </>
    );
};

export default SampLotInfo;