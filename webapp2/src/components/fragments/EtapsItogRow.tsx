import React, { FC, useState } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";

const EtapsItogRow: FC = () => {
    const [Summ, setSumm] = useState("3 110 000,00");
    const [SummPlusNds, setSummPlusNds] = useState("3 683 000,00");
    return (
        <>
            <Layout className="EtapsItogRow">
                <Layout flex={1}>
                    <Text className="weight700">Этап 1</Text>
                </Layout>
                <Layout flex={6}>
                    <Text className="weight700">Разработка документации</Text>
                </Layout>
                <Layout flex={3} className="aic">
                    <Text className="label mr2" align="center">Сумма без НДС</Text>
                    <Text className="summ" align="center">{Summ}</Text>
                </Layout>
                <Layout flex={3} className="aic">
                    <Text className="label mr2" align="center">Сумма c НДС</Text>
                    <Text className="summ" align="center">{SummPlusNds}</Text>
                </Layout>
            </Layout>
        </>
    );
};

export default EtapsItogRow;