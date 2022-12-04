import { FC, useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { Layout } from "@consta/uikit/Layout";
import { IconInfo } from '@consta/uikit/IconInfo';
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import PopoverCustom from "../../../util/PopoverCustom";
import { ICostOther } from "../../../../models/ISamp";
import { IconTrash } from "@consta/uikit/IconTrash";
import { IconAdd } from "@consta/uikit/IconAdd";
import { Modal } from "@consta/uikit/Modal";
import { sampSlice } from "../../../../store/reducers/samp/sampSlice";
import { numberWithSpaces } from "../../../../helpers";
import SaveCostButton from "../SaveCostButton";



const TabCostOther: FC = () => {
    const dispatch = useAppDispatch()
    const {
        full_laboriousness,
        costs,
        cost_sums,
        isValidateOn
    } = useAppSelector(state => state.sampReducer)

    let full_sum_laboriousness = full_laboriousness ? parseFloat(full_laboriousness) / (164.4 / 8) : 0

    let item: ICostOther = {
        "kp_cost_guid": "1",    //GUID затраты
        "cost_type": 2,         //1
        "cost_name": "",        //Наименование
        "cost_menge": "0",        //Количество ЕИ
        "cost_meins": "0",        //ЕИ
        "cost_month": "0",        //Кол-во месяцев
        "cost_price": "0",        //Цена

        "key": 0,
        "user_per_month": "0",
        "full_price": "0",
        "price_per_user_per_month": "0",
    }

    const itemList = costs.cost_other

    const addItem = () => {
        item.key = itemList.length > 0 ? itemList[itemList.length - 1].key + 1 : 1
        dispatch(sampSlice.actions.addCostOther(item))
    }

    useEffect(() => {
        if ( itemList.length === 0) {
            addItem() // начальный пустой массив
        }
    }, [itemList])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delItemKey, setDelItemKey] = useState<number | null>(null);

    const delModalOpen = (key: number) => {
        setIsModalOpen(true)
        setDelItemKey(key)
    }

    const delItem = () => {
        setIsModalOpen(false)
        dispatch(sampSlice.actions.delCostOther(delItemKey))
    }

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)
    const [popoverText, setPopoverText] = useState<string>("")

    const handleMouseMove = (event: React.MouseEvent, type: number) => {
        setPosition({ x: event.clientX, y: event.clientY })
        let msg = ""
        if (type == 0) {
            msg = "Стоимость услуг\n на 1 исполнителя\n в месяц, без НДС"
        }

        setPopoverText(msg)
    };

    const handleCostOtherPropText = (key: number, name: string, value: string) => {
        dispatch(sampSlice.actions.setCostOtherProp({
            key: key,
            name: name,
            value: value
        }))
    }

    const handleCostOtherPropNumber = (key: number, name: string, value: string) => {
        if (value === '' || value.match(/^([0-9]{1,11})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setCostOtherProp({
                key: key,
                name: name,
                value: value
            }))
        }
    }

    return (
        <>
            <PopoverCustom position={position} text={popoverText} />
            <Text as="div" size="l" className="mb1 weight700">
                Расчет прочих затрат
            </Text>

            <Layout className="tableHeader">
                <Layout flex={5} className="tar">
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label mr05">
                        Наименование затрат
                    </Text>
                </Layout>
                <Layout flex={2}>
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Единица<br />измерения (ЕИ)</Text>
                </Layout>
                <Layout flex={2}>
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Количество<br />ЕИ</Text>
                </Layout>
                <Layout flex={2}>
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Количество<br />месяцев</Text>
                </Layout>
                <Layout flex={3}>
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Цена</Text>
                </Layout>
                <Layout flex={3}>
                    <Text className="label">Сумма</Text>
                </Layout>
                <Layout flex={3}>
                    <Text className="label">Количество<br />чел./мес.</Text>
                </Layout>
                <Layout flex={3}>
                    <Text className="label">Стоимость услуг на<br />1 исполнителя в мес.</Text>
                    <div onMouseMove={(e) => handleMouseMove(e, 0)} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                </Layout>
                <Layout flex={1}>
                </Layout>
            </Layout>
            <div className="scrollBlock">
                {itemList.map(({
                    key,
                    kp_cost_guid,
                    cost_type,
                    cost_name,
                    cost_meins,
                    cost_menge,
                    cost_month,
                    cost_price,
                    full_price,
                    user_per_month,
                    price_per_user_per_month }) => (
                    <Layout className="Row mb1" key={key}>
                        <Layout flex={5} className="tar aic">
                            <TextField
                                name="cost_name"
                                value={cost_name}
                                size="s"
                                width="full"
                                className="mr05"
                                onChange={({ e }: any) => { handleCostOtherPropText(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(cost_name) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic">
                            <TextField
                                name="cost_meins"
                                value={parseFloat(cost_meins) == 0 ? "-- --" : cost_meins}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleCostOtherPropText(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(cost_meins) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic">
                            <TextField
                                name="cost_menge"
                                value={parseFloat(cost_menge) == 0 ? "-- --" : cost_menge}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleCostOtherPropNumber(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(cost_menge) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic">
                            <TextField
                                name="cost_month"
                                value={parseFloat(cost_month) == 0 ? "-- --" : cost_month}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleCostOtherPropNumber(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(cost_month) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={3} className="jcc aic">
                            <TextField
                                name="cost_price"
                                value={parseFloat(cost_price) == 0 ? "-- --" : numberWithSpaces(cost_price)}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleCostOtherPropNumber(key, e.target.name, e.target.value) }}
                                status={(isValidateOn && (parseFloat(cost_price) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={3} className="jcc aic full_price">
                            <Text>{parseFloat(full_price) == 0 ? "-- --" : numberWithSpaces(full_price)}</Text>
                        </Layout>
                        <Layout flex={3} className="jcc aic full_sum_laboriousness">
                            {/* user_per_month */}
                            <Text>{full_sum_laboriousness == 0 ? "-- --" : full_sum_laboriousness.toFixed(10)}</Text>
                        </Layout>
                        <Layout flex={3} className="jcc aic price_per_user_per_month">
                            <Text>{parseFloat(price_per_user_per_month) == 0 ? "-- --" : numberWithSpaces(price_per_user_per_month)}</Text>
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
            <Layout className="mb1">
                <Layout flex={5}></Layout>
                <Layout flex={2}></Layout>
                <Layout flex={2}></Layout>
                <Layout flex={2}></Layout>
                <Layout flex={3} className="aic jcc SubSummFooterLabel">Итого</Layout>
                <Layout flex={3} className="aic jcc SubSummFooter">{parseFloat(cost_sums.cost_other.sum_full_price) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_other.sum_full_price)}</Layout>
                <Layout flex={3} className="aic jcc SubSummFooter">{parseFloat(cost_sums.cost_other.sum_user_per_month) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_other.sum_user_per_month)}</Layout>
                <Layout flex={3} className="aic jcc SubSummFooter">{parseFloat(cost_sums.cost_other.sum_price_per_user_per_month) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_other.sum_price_per_user_per_month)}</Layout>
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

export default TabCostOther;