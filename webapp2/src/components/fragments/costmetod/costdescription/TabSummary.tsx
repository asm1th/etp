import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useUpdateLinkMutation, useUpdateUsrpMutation } from "../../../../services/SampService";
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconCheck } from '@consta/uikit/IconCheck';
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import { format } from "date-fns";
import { ICostBtrip, ICostOverhead } from "../../../../models/ISamp";
import { IconTrash } from "@consta/uikit/IconTrash";
import { IconAdd } from "@consta/uikit/IconAdd";
import { Modal } from "@consta/uikit/Modal";
import PopoverCustom from "../../../util/PopoverCustom";
import { IconInfo } from "@consta/uikit/IconInfo";
import { sampSlice } from "../../../../store/reducers/samp/sampSlice";



const TabSummary: FC = () => {
    const dispatch = useAppDispatch()
    const { stags, link, links } = useAppSelector(state => state.sampReducer)
    const [updateLink, { isLoading: isUpdatingLink }] = useUpdateLinkMutation()
    const [updateUsrp, { isLoading: isUpdatingUsrp }] = useUpdateUsrpMutation()

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)
    const msg = "Сумму можно расписать\n по специалистам или указать\n среднюю сумму, одинаковую для всех"
    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };

    const [savedDate, setSavedDate] = useState<string>("")
    const onSave = () => {
        updateLink(links)
        stags.forEach(stag => {
            stag.units.forEach(unit => {
                const usrp = unit.usrps.filter(usrp => usrp.link_id === link);
                updateUsrp(usrp[0])
            });
        })

        setSavedDate(format(new Date(), 'dd.MM.yyyy HH:mm:ss'))
    }

    //list
    type ISummary = {
        key: number
        "kp_unit_guid": string
        "cost_name": string
        "cost_overhead": number
        "cost_profitability": number
        "cost_allcost": number
        "cost_time_per_month": number
        "rate_per_month": number
        "rate_per_day": number
    }
    const items: ISummary[] = []

    stags.forEach(stag => {
        stag.units.forEach(curUnit => {

            let newItem: ISummary = {
                key: 0,
                "kp_unit_guid": "",
                "cost_name": "",
                "cost_overhead": 0,
                "cost_profitability": 0,
                "cost_allcost": 0,
                "cost_time_per_month": 0,
                "rate_per_month": 0,
                "rate_per_day": 0,
            }
            newItem.key = items.length > 0 ? items[items.length - 1].key + 1 : 1
            newItem.cost_name = curUnit.opr_usl_unit
            items.push(newItem)
        })
    })

    const [itemList, setItemList] = useState(items);


    return (
        <>
            <PopoverCustom position={position} text={msg} />
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
                            {cost_overhead == 0 ? "-- --" : cost_overhead.toFixed(2)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {cost_profitability == 0 ? "-- --" : cost_profitability.toFixed(2)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {cost_allcost == 0 ? "-- --" : cost_allcost.toFixed(2)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {cost_time_per_month == 0 ? "-- --" : cost_time_per_month.toFixed(2)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {rate_per_month == 0 ? "-- --" : rate_per_month.toFixed(2)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {rate_per_day == 0 ? "-- --" : rate_per_day.toFixed(2)}
                        </Layout>
                    </Layout>
                ))}
            </div>

            <hr />

            <Layout flex={4} className="aic jcfe mt1">
                {savedDate ? (
                    <Text className="mr1 ml1 label tar">Сохранено {savedDate}</Text>
                ) : null}
                <Button label="Сохранить изменения" onClick={onSave} size="m" iconLeft={IconCheck} loading={isUpdatingLink || isUpdatingUsrp} />
            </Layout>
        </>
    );
};

export default TabSummary;