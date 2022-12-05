import { FC, useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppSelector } from "../../../../hooks/redux";
import { Layout } from "@consta/uikit/Layout";
import { TextField } from "@consta/uikit/TextField";
import PopoverCustom from "../../../util/PopoverCustom";
import SaveCostButton from "../SaveCostButton";
import { numberWithSpaces } from "../../../../helpers";


const TabSummary: FC = () => {
    const { costs, stags } = useAppSelector(state => state.sampReducer)

    //list
    type ISummary = {
        key: number
        "kp_unit_guid": string
        "cost_name": string
        "cost_overhead": string
        "cost_profitability": string
        "cost_allcost": string
        "cost_time_per_month": string
        "rate_per_month": string
        "rate_per_day": string
    }
    const items: ISummary[] = []

    //const [itemList, setItemList] = useState(items);
    const [itemList, setItemList] = useState<ISummary[]>(items)

    const setItems = () => {
        costs.salary.forEach(salary => {
            let newItem: ISummary = {
                key: items.length > 0 ? items[items.length - 1].key + 1 : 1,
                "kp_unit_guid": salary.kp_unit_guid,
                "cost_name": salary.cost_name,
                "cost_overhead": salary.cost_overhead,
                "cost_profitability": salary.profitability,
                "cost_allcost": (parseFloat(salary.cntrb_disability) + parseFloat(salary.cntrb_oms) + parseFloat(salary.cntrb_pension) + parseFloat(salary.cost_overhead)).toFixed(10), //add other costs
                "cost_time_per_month": salary.cost_time_per_month,
                "rate_per_month": salary.rate_per_month,
                "rate_per_day": salary.rate_per_day
            }
            items.push(newItem)
        })
    }

    setItems()

    useEffect(() => {
        setItems()
    }, [costs])

    return (
        <>
            <Text as="div" size="l" className="mb1 weight700">
                Итоговый расчет
            </Text>

            <Layout className="tableHeader">
                <Layout flex={4} className="tar">
                    <Text className="label mr05">
                        Наименование расценки
                    </Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Итого с учетом<br />накладных расходов</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Итого с учетом<br />рентабельности</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Итого с учетом<br />всех затрат</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Количество часов<br />работы в месяц</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Ставка 1 чел./час</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Ставка 1 чел./день<br />при 8 часовом раб. дне</Text>
                </Layout>
            </Layout>
            <div className="scrollBlock">
                {itemList.map(({ key, cost_name, cost_overhead, cost_profitability, cost_allcost, cost_time_per_month, rate_per_month, rate_per_day }) => (
                    <Layout className="Row mb1" key={key}>
                        <Layout flex={4} className="aic">
                            <TextField
                                name="cost_name"
                                value={cost_name}
                                size="s"
                                width="full"
                                disabled
                                className="mr05"
                            />
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(cost_overhead) == 0 ? "-- --" : numberWithSpaces(cost_overhead)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(cost_profitability) == 0 ? "-- --" : numberWithSpaces(cost_profitability)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(cost_allcost) == 0 ? "-- --" : numberWithSpaces(cost_allcost)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(cost_time_per_month) == 0 ? "-- --" : numberWithSpaces(cost_time_per_month)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(rate_per_month) == 0 ? "-- --" : numberWithSpaces(rate_per_month)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(rate_per_day) == 0 ? "-- --" : numberWithSpaces(rate_per_day)}
                        </Layout>
                    </Layout>
                ))}
            </div>

            <hr />

            <SaveCostButton/>
        </>
    );
};

export default TabSummary;