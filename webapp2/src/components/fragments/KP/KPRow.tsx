import { FC } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/LayoutCanary";
import { useAppSelector } from "../../../hooks/redux";

const KPRow: FC = () => {
    const { stags } = useAppSelector(state => state.sampReducer)

    return (
        <>
            <Layout className="row">
                <Layout flex={3} className="tar">
                    <Text >
                        Наименование расценки
                    </Text>
                </Layout>
                <Layout flex={3} className="tar">
                    <Text >
                        Альтернативное наименование расценки
                    </Text>
                </Layout>
                <Layout flex={1}>
                    <Text  align="center">Единица<br />измерения (ЕИ)</Text>
                </Layout>
                <Layout flex={1}>
                    <Text  align="center">Количество ЕИ</Text>
                </Layout>
                <Layout flex={1}>
                    <Text  align="center">* Стоимость ЕИ</Text>
                </Layout>
                <Layout flex={1}>
                    <Text  align="center">Ставка НДС</Text>
                </Layout>
                <Layout flex={1}>
                    <Text  align="center">Сумма без НДС</Text>
                </Layout>
                <Layout flex={1}>
                    <Text  align="center">Сумма с НДС</Text>
                </Layout>
            </Layout>


        </>
    );
};

export default KPRow;