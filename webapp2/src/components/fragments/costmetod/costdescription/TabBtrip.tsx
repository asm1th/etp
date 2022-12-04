import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { Layout } from "@consta/uikit/Layout";
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import { ICostBtrip } from "../../../../models/ISamp";
import { IconTrash } from "@consta/uikit/IconTrash";
import { IconAdd } from "@consta/uikit/IconAdd";
import { Modal } from "@consta/uikit/Modal";
import PopoverCustom from "../../../util/PopoverCustom";
import { IconInfo } from "@consta/uikit/IconInfo";
import { sampSlice } from "../../../../store/reducers/samp/sampSlice";
import { numberWithSpaces } from "../../../../helpers";
import SaveCostButton from "../SaveCostButton";


const TabBtrip: FC = () => {
    const dispatch = useAppDispatch()
    const { 
        costs,
        cost_sums, 
        isValidateOn } = useAppSelector(state => state.sampReducer)
    
    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)
    const msg = "Сумму можно расписать\n по специалистам или указать\n среднюю сумму, одинаковую для всех"
    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };

    //list
    const item: ICostBtrip = {
        "kp_btrip_guid": "",     //GUID командировочных расходов 
        "kp_unit_guid": "",      //GUID КР
        "pers_count": "0",         //Количество человек
        "btrip_days": "0",         //Количество дней
        "btrip_cost": "0",         //Проезд в одну сторону
        "btrip_day_cost": "0",     //Проживание в 1 сутки
        "btrip_day_allow": "0",     //Суточные

        "key": 0,                   //ID
        "cost_name": "",
        "full_price": "",
        "user_per_day": "",
        "user_per_month": "",
        "price_per_user_per_month": "",
    }

    const itemList = costs.cost_btrip;
    
    const addItem = () => {
        item.key = itemList.length > 0 ? itemList[itemList.length - 1].key + 1 : 1
        dispatch(sampSlice.actions.addBtrip(item))
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delItemKey, setDelItemKey] = useState<number | null>(null);

    const delModalOpen = (key: number) => {
        setIsModalOpen(true)
        setDelItemKey(key)
    }

    const delItem = () => {
        setIsModalOpen(false)
        dispatch(sampSlice.actions.delBtrip(delItemKey))
    }

    const handleBtrip = (value: string) => {
        if (value === '' || value.match(/^([0-9]{1,3})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setBtrip({ btrip_price: value }))
        }
    }

    const handleBtripPropNumber = (key: number, name: string, value: string) => {
        if (value === '' || value.match(/^([0-9]{1,11})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setBtripProp({
                key: key,
                name: name,
                value: value
            }))
        }
    }


    return (
        <>
            <PopoverCustom position={position} text={msg} />
            <Text as="div" size="l" className="mb1 weight700">
                Расчет командировочных расходов
            </Text>
            <Layout className="Row mb1">
                <Layout className="aic">
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text>
                        Командировочные расходы
                    </Text>
                    <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                </Layout>
                <Layout className="aic ml1">
                    <TextField
                        name="profitability"
                        value={costs.btrip_price}
                        size="s"
                        width="full"
                        className="textCenter"
                        onChange={({ e }: any) => handleBtrip(e.target.value)}
                        status={(isValidateOn && (parseFloat(costs.btrip_price) === 0)) ? 'alert' : undefined}
                    />
                    <Text className="ml05">руб.</Text>
                </Layout>
                <Layout></Layout>
            </Layout>

            <Layout className="tableHeader">
                <Layout flex={6} className="tar">
                    <Text className="label mr05">
                        Наименование расценки
                    </Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Количество<br />человек</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Количество<br />дней</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Проезд в одну<br />сторону</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Суточные</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Проживание<br />в 1 сутки</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">Всего</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">чел./дни всего</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">ч/мес</Text>
                </Layout>
                <Layout flex={2}>
                    <Text className="label">на 1 чел. месяц</Text>
                </Layout>
                <Layout flex={1}>
                </Layout>
            </Layout>
            <div className="scrollBlock">
                {itemList.map(({
                    key,
                    kp_btrip_guid,
                    cost_name,
                    pers_count,
                    btrip_days,
                    btrip_cost,
                    btrip_day_cost,
                    btrip_day_allow,
                    full_price,
                    user_per_day,
                    user_per_month,
                    price_per_user_per_month
                }) => (
                    <Layout className="Row mb1" key={`${cost_name}_${key}`}>
                        <Layout flex={6} className="aic">
                            <TextField
                                name="cost_name"
                                value={cost_name}
                                size="s"
                                width="full"
                                className="mr05"
                                disabled
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="pers_count"
                                value={pers_count}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                                onChange={({ e }: any) => { handleBtripPropNumber(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(pers_count) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="btrip_days"
                                value={btrip_days}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                                onChange={({ e }: any) => { handleBtripPropNumber(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(btrip_days) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="btrip_cost"
                                value={btrip_cost}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                                onChange={({ e }: any) => { handleBtripPropNumber(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(btrip_cost) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="btrip_day_allow"
                                value={btrip_day_allow}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                                onChange={({ e }: any) => { handleBtripPropNumber(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(btrip_day_allow) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="btrip_day_cost"
                                value={btrip_day_cost}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                                onChange={({ e }: any) => { handleBtripPropNumber(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(btrip_day_cost) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(full_price) == 0 ? "-- --" : numberWithSpaces(full_price)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(user_per_day) == 0 ? "-- --" : numberWithSpaces(user_per_day)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(user_per_month) == 0 ? "-- --" : numberWithSpaces(user_per_month)}
                        </Layout>
                        <Layout flex={2} className="aic jcc">
                            {parseFloat(price_per_user_per_month) == 0 ? "-- --" : numberWithSpaces(price_per_user_per_month)}
                        </Layout>
                        <Layout flex={1} className="jcc aic">
                            <Button
                                onlyIcon={true}
                                title="Удалить"
                                iconLeft={IconTrash}
                                onClick={() => delModalOpen(key)}
                                view="ghost" />
                        </Layout>
                    </Layout>
                ))}
            </div>

            <Layout>
                <Button
                    label="Добавить затраты"
                    iconLeft={IconAdd}
                    view="secondary"
                    size="m"
                    onClick={() => addItem()} />
            </Layout>

            <hr />

            <Layout>
                <Layout flex={6}></Layout>
                <Layout flex={2}></Layout>
                <Layout flex={2}></Layout>
                <Layout flex={2}></Layout>
                <Layout flex={2}></Layout>

                <Layout flex={2} className="aic jcc SubSummFooterLabel">Итого</Layout>
                <Layout flex={2} className="aic jcc SubSummFooter">
                    {parseFloat(cost_sums.cost_btrip.sum_full_price) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_btrip.sum_full_price)}
                </Layout>
                <Layout flex={2} className="aic jcc SubSummFooter"></Layout>
                <Layout flex={2} className="aic jcc SubSummFooter">
                    {parseFloat(cost_sums.cost_btrip.sum_user_per_month) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_btrip.sum_user_per_month)}
                </Layout>
                <Layout flex={2} className="aic jcc SubSummFooter">
                    {parseFloat(cost_sums.cost_btrip.sum_price_per_user_per_month) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_btrip.sum_price_per_user_per_month)}
                </Layout>
                <Layout flex={1} className="aic jcc SubSummFooter SubSummFooterLast"></Layout>

            </Layout>

            <SaveCostButton/>

            <Modal
                isOpen={isModalOpen}
                onClickOutside={() => setIsModalOpen(false)}
                onEsc={() => setIsModalOpen(false)}
                hasOverlay={true}
                className="alertModal"
            >
                <Text as="p" size="s" view="secondary">
                    Удаление затрат
                </Text>
                <Text as="p" size="m" view="primary">
                    Удалить выбранную строку затрат?
                </Text>
                <div className="modalAction">
                    <Button
                        size="m"
                        view="secondary"
                        label="Отменить"
                        width="default"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <Button
                        size="m"
                        view="primary"
                        label="Да, удалить"
                        width="default"
                        className="btnReject ml1"
                        onClick={() => delItem()}
                    />
                </div>
            </Modal>
        </>
    );
};

export default TabBtrip;