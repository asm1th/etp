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
import { numberWithSpaces } from "../../../../helpers";



const TabBtrip: FC = () => {
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
    const item: ICostBtrip = {
        "key": 0,                   //ID
        "cost_name": "",
        "kp_btrip_guid": "",     //GUID командировочных расходов 
        "kp_unit_guid": "",      //GUID КР
        "pers_count": "0",         //Количество человек
        "btrip_days": "0",         //Количество дней
        "btrip_cost": "0",         //Проезд в одну сторону
        "btrip_day_cost": "0",     //Проживание в 1 сутки
        "btrip_day_allow": "0"     //Суточные
    }
    const items: ICostBtrip[] = []

    stags.forEach(stag => {
        stag.units.forEach(curUnit => {
            
            let newItem = {
                "key": 0,
                "cost_name": "",
                "kp_btrip_guid": "",
                "kp_unit_guid": "",
                "pers_count": "0",
                "btrip_days": "0",
                "btrip_cost": "0",
                "btrip_day_cost": "0",
                "btrip_day_allow": "0"
            }
            newItem.key = items.length > 0 ? items[items.length - 1].key + 1 : 1
            newItem.cost_name = curUnit.opr_usl_unit
            items.push(newItem)
        })
    })

    const [itemList, setItemList] = useState(items);
    const addItem = () => {
        if (itemList.length > 0) {
            item.key = itemList[itemList.length - 1].key + 1
        } else {
            item.key = 1
        }
        setItemList(itemList => [...itemList, item])
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delTItemKey, setDelTItemKey] = useState<number | null>(null);

    const delModalOpen = (key: number) => {
        setIsModalOpen(true)
        setDelTItemKey(key)
    }

    const delItem = () => {
        const index = itemList.findIndex((List: any) => List.key === delTItemKey)
        itemList.splice(index, 1)
        setItemList(itemList)
        setIsModalOpen(false)
        if (itemList.length == 1) {
            setItemList([item])
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
                        value="-- --"
                        size="s"
                        width="full"
                        className="textCenter"
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
                {itemList.map(({ key, kp_btrip_guid, cost_name, pers_count, btrip_days, btrip_cost, btrip_day_cost, btrip_day_allow }) => (
                    <Layout className="Row mb1" key={cost_name}>
                        <Layout flex={6} className="aic">
                            <TextField
                                name="cost_name"
                                value={cost_name}
                                size="s"
                                width="full"
                                className="mr05"
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="pers_count"
                                value={parseFloat(pers_count) == 0 ? "-- --" : pers_count}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="btrip_days"
                                value={parseFloat(btrip_days) == 0 ? "-- --" : btrip_days}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="btrip_cost"
                                value={parseFloat(btrip_cost) == 0 ? "-- --" : btrip_cost}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="btrip_day_allow"
                                value={parseFloat(btrip_day_allow) == 0 ? "-- --" : btrip_day_allow}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                            />
                        </Layout>
                        <Layout flex={2} className="aic ">
                            <TextField
                                name="btrip_day_cost"
                                value={parseFloat(btrip_day_cost) == 0 ? "-- --" : btrip_day_cost}
                                size="s"
                                width="full"
                                className="textCenter RowInput"
                            />
                        </Layout>
                        <Layout flex={2} className="aic jcc">{numberWithSpaces("0")}</Layout>
                        <Layout flex={2} className="aic jcc">{numberWithSpaces("0")}</Layout>
                        <Layout flex={2} className="aic jcc">{numberWithSpaces("0")}</Layout>
                        <Layout flex={2} className="aic jcc">{numberWithSpaces("0")}</Layout>
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
                <Layout flex={4}></Layout>
                <Layout flex={3} className="SubSummFooter">
                    <Layout flex={1} className="aic jcc">Итого</Layout>
                    {/* <Layout flex={1} className="aic jcc mr1">{parseFloat(currentStage.stagSumm) == 0 ? "-- --" : currentStage.stagSumm}</Layout>*/}
                    <Layout flex={1} className="aic jcc"></Layout>
                    <Layout flex={2} className="aic jcc">{numberWithSpaces("0")}</Layout>
                    <Layout flex={2} className="aic jcc"></Layout>
                    <Layout flex={2} className="aic jcc">{numberWithSpaces("0")}</Layout>
                    <Layout flex={2} className="aic jcc">{numberWithSpaces("0")}</Layout>
                    <Layout flex={1} className="aic jcc"></Layout>
                </Layout>
            </Layout>

            <Layout flex={4} className="aic jcfe mt1">
                {savedDate ? (
                    <Text className="mr1 ml1 label tar">Сохранено {savedDate}</Text>
                ) : null}
                <Button label="Сохранить изменения" onClick={onSave} size="m" iconLeft={IconCheck} loading={isUpdatingLink || isUpdatingUsrp} />
            </Layout>


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