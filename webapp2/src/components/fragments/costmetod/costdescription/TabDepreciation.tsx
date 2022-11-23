import { FC, useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useUpdateLinkMutation, useUpdateUsrpMutation } from "../../../../services/SampService";
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconInfo } from '@consta/uikit/IconInfo';
import { IconCheck } from '@consta/uikit/IconCheck';
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import PopoverCustom from "../../../util/PopoverCustom";
import { format } from "date-fns";
import quan_unit from "../../../../assets/quan_unit.json";
import { ICostDepreciation } from "../../../../models/ISamp";
import { IconTrash } from "@consta/uikit/IconTrash";
import { IconAdd } from "@consta/uikit/IconAdd";
import { Modal } from "@consta/uikit/Modal";
import { sampSlice } from "../../../../store/reducers/samp/sampSlice";
import { numberWithSpaces } from "../../../../helpers";



type Qunit = {
    "MANDT": number;
    "SPRAS": string;
    "MSEHI": string; // код
    "MSEH3": string;
    "MSEH6": string;
    "MSEHT": string;
    "MSEHL": string; // чел
};
const quan_units: Qunit[] = quan_unit


const TabDepreciation: FC = () => {
    const dispatch = useAppDispatch()
    const { 
        stags, 
        link, 
        links, 
        cost_depreciation: itemList, 
        cost_sums,
        isValidateOn } = useAppSelector(state => state.sampReducer)
    const [updateLink, { isLoading: isUpdatingLink }] = useUpdateLinkMutation()
    const [updateUsrp, { isLoading: isUpdatingUsrp }] = useUpdateUsrpMutation()

    const [savedDate, setSavedDate] = useState<string>("")
    const onSave = () => {
        setSavedDate(format(new Date(), 'dd.MM.yyyy HH:mm:ss'))
    }
    
    let item: ICostDepreciation = {
        "kp_cost_guid": "1",  //GUID затраты
        "cost_type": "1",  //1
        "cost_name": "", //Наименование
        "cost_menge": "0", //Количество ЕИ
        "cost_months_use": "0",  //Кол-во месяцев использования
        "cost_months_useful": "0", //Срок полезного использования
        "cost_meins_price": "0", //Стоимость ЕИ
        "cost_per_month": "0",  //Кол-во чел\мес

        "key": 1,
        "price_per_month": "0",
        "price": "0",
        "price_per_user_per_month": "0"
    }

    const addItem = () => {
        item.key = itemList.length > 0 ? itemList[itemList.length - 1].key + 1 : 1
        dispatch(sampSlice.actions.addDepreciation(item))
    }

    useEffect(() => {
        if ( itemList.length === 0) {
            addItem() // начальный пустой массив
        }
    }, [itemList])
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delItemKey, setDelItemKey] = useState<number | null>(null);

    const delModalOpen = (key: number) =>{
        setIsModalOpen(true)
        setDelItemKey(key)
    }

    const delItem = () => {
        setIsModalOpen(false)
        dispatch(sampSlice.actions.delDepreciation(delItemKey))
    }

    // const handle = (kp_unit_guid: string, value: string) => {
    //     if (value === '' || value.match(/^([0-9]{1,11})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
    //         dispatch(sampSlice.actions.setUnitSalary({ 
    //             kp_unit_guid: kp_unit_guid, 
    //             unit_salary: value
    //         }))
    //     }
    // }

    const handleDepreciationPropText = (key:number, name:string, value: string) => {
        dispatch(sampSlice.actions.setDepreciationProp({
            key: key,
            name: name, 
            value: value
        }))
    }

    const handleDepreciationPropNumber = (key:number, name:string, value: string) => {
        if (value === '' || value.match(/^([0-9]{1,11})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setDepreciationProp({
                key: key,
                name: name, 
                value: value
            }))
        }
    }


    return (
        <>
            <Text as="div" size="l" className="mb1 weight700">
                Расчет затрат на амортизацию
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
                    <Text className="label">Кол-во ЕИ</Text>
                </Layout>
                <Layout flex={4}>
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Стоимость ЕИ<br />(остаточная стоимость)</Text>
                </Layout>
                <Layout flex={3}>
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Срок полезного<br /> использования, мес.</Text>
                </Layout>
                <Layout flex={3}>
                    <Text className="label">Сумма отчислений<br /> за ед. в месяц</Text>
                </Layout>
                <Layout flex={3}>
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Кол-во месяцев<br />использования</Text>
                </Layout>
                <Layout flex={3}>
                    <Text className="label">Сумма отчислений<br />руб. всего</Text>
                </Layout>
                <Layout flex={2}>
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Кол-во<br />чел./мес.</Text>
                </Layout>
                <Layout flex={3}>
                    <Text className="label">Стоимость услуг<br />на 1 исполнителя в мес.</Text>
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
                    cost_menge, 
                    cost_months_use, 
                    cost_months_useful, 
                    cost_meins_price, 
                    cost_per_month,
                    price_per_month,
                    price,
                    price_per_user_per_month
                    }) => (

                    <Layout className="Row mb1" key={key}>
                        <Layout flex={5} className="tar aic">
                            <TextField
                                name="cost_name"
                                value={cost_name}
                                size="s"
                                width="full"
                                className="mr05"
                                onChange={({ e }: any) => { handleDepreciationPropText(key, e.target.name, e.target.value)}}
                                status={(isValidateOn && (parseFloat(cost_name) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={2} className="aic">
                            <TextField
                                name="cost_menge"
                                value={parseFloat(cost_menge) == 0 ? "" : cost_menge}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleDepreciationPropNumber(key, e.target.name, e.target.value)}}
                                status={(isValidateOn && (parseFloat(cost_menge) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={4} className="aic">
                            <TextField
                                name="cost_meins_price"
                                value={parseFloat(cost_meins_price) == 0 ? "" : cost_meins_price}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleDepreciationPropNumber(key, e.target.name, e.target.value)}}
                                status={(isValidateOn && (parseFloat(cost_meins_price) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={3} className="aic">
                            <TextField
                                name="cost_months_useful"
                                value={parseFloat(cost_months_useful) == 0 ? "" : cost_months_useful}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleDepreciationPropNumber(key, e.target.name, e.target.value)}}
                                status={(isValidateOn && (parseFloat(cost_months_useful) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={3} className="jcc aic price_per_month">
                            <Text>{parseFloat(price_per_month) == 0 ? "-- --" : numberWithSpaces(price_per_month)}</Text>
                        </Layout>
                        <Layout flex={3} className="aic">
                            <TextField
                                name="cost_months_use"
                                value={parseFloat(cost_months_use) == 0 ? "" : cost_months_use}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleDepreciationPropNumber(key, e.target.name, e.target.value)}}
                                status={(isValidateOn && (parseFloat(cost_months_use) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={3} className="jcc aic price">
                            <Text>{parseFloat(price) == 0 ? "-- --" : numberWithSpaces(price)}</Text>
                        </Layout>
                        <Layout flex={2} className="aic">
                            <TextField
                                name="cost_per_month"
                                value={parseFloat(cost_per_month) == 0 ? "" : cost_per_month}
                                size="s"
                                width="full"
                                className="RowInput textCenter"
                                onChange={({ e }: any) => { handleDepreciationPropNumber(key, e.target.name, e.target.value)}}
                                status={(isValidateOn && (parseFloat(cost_per_month) === 0)) ? 'alert' : undefined}
                            />
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
                                view="ghost"/>
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
                    onClick={() => addItem()}/>
            </Layout>
            <hr />

            <Layout>
                <Layout flex={6}></Layout>
                <Layout flex={24} className="SubSummFooter">
                    <Layout flex={2} className="aic jcc">Итого</Layout>
                    <Layout flex={4} className="aic jcc">{parseFloat(cost_sums.cost_depreciation.sum_cost_meins_price) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_depreciation.sum_cost_meins_price)}</Layout>
                    <Layout flex={3} className="aic jcc"></Layout>
                    <Layout flex={3} className="aic jcc">{parseFloat(cost_sums.cost_depreciation.sum_price_per_month) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_depreciation.sum_price_per_month)}</Layout>
                    <Layout flex={3} className="aic jcc"></Layout>
                    <Layout flex={3} className="aic jcc">{parseFloat(cost_sums.cost_depreciation.sum_price) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_depreciation.sum_price)}</Layout>
                    <Layout flex={2} className="aic jcc"></Layout>
                    <Layout flex={3} className="aic jcc">{parseFloat(cost_sums.cost_depreciation.sum_price_per_user) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_depreciation.sum_price_per_user)}</Layout>
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

export default TabDepreciation;