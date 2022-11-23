import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useUpdateLinkMutation, useUpdateUsrpMutation } from "../../../../services/SampService";
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconCheck } from '@consta/uikit/IconCheck';
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import { format } from "date-fns";
import { ICostArray, ICostOverhead } from "../../../../models/ISamp";
import { IconTrash } from "@consta/uikit/IconTrash";
import { IconAdd } from "@consta/uikit/IconAdd";
import { Modal } from "@consta/uikit/Modal";
import { sampSlice } from "../../../../store/reducers/samp/sampSlice";
import { numberWithSpaces } from "../../../../helpers";



const TabCostOverhead: FC = () => {
    const dispatch = useAppDispatch()
    const {
        stags,
        cost_overhead: itemList,
        cost_sums,
        isValidateOn } = useAppSelector(state => state.sampReducer)
    const [updateLink, { isLoading: isUpdatingLink }] = useUpdateLinkMutation()
    const [updateUsrp, { isLoading: isUpdatingUsrp }] = useUpdateUsrpMutation()


    const [savedDate, setSavedDate] = useState<string>("")
    const onSave = () => {
        //
        setSavedDate(format(new Date(), 'dd.MM.yyyy HH:mm:ss'))
    }

    //list
    const item: ICostOverhead = {
        "cost_id": 0,            //ID
        "cost_description": "",  //Наименование
        "cost_value": "0",
        "cost_array": [],       //Значение
        "requered": false
    }

    const addItem = () => {
        item.cost_id = itemList.length > 0 ? itemList[itemList.length - 1].cost_id + 1 : 1
        dispatch(sampSlice.actions.addCostOverhead(item))
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delItemKey, setDelItemKey] = useState<number | null>(null);

    const delModalOpen = (key: number) => {
        setIsModalOpen(true)
        setDelItemKey(key)
    }

    const delItem = () => {
        setIsModalOpen(false)
        dispatch(sampSlice.actions.delCostOverhead(delItemKey))
    }

    const handleCostOverheadPropText = (key: number, name: string, value: string) => {
        dispatch(sampSlice.actions.setCostOverheadProp({
            key: key,
            name: name,
            value: value
        }))
    }

    const handleCostOverheadPropNumber = (key: number, name: string, value: string) => {
        
        if (value === '' || value.match(/^([0-9]{1,11})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setCostOverheadProp({
                key: key,
                name: name,
                value: value
            }))
        }
    }
    return (
        <>
            <Layout className="aic mb1">
                <Layout flex={1} className="aic">
                    <Text as="div" size="l" className="weight700">
                        Накладные расходы
                    </Text>
                </Layout>
                <Button
                    label="Добавить затраты"
                    iconLeft={IconAdd}
                    view="secondary"
                    size="m"
                    onClick={() => addItem()} />
            </Layout>

            {itemList.map(({ cost_id, cost_description, cost_value, requered }) => (
                <Layout className="Row mb1" key={cost_id}>
                    <Layout style={{width:'12px'}}>
                        {requered ? (<span className="FieldLabel-Star mr05">*</span>) : null}
                    </Layout>
                    <Layout flex={5} className="aic">
                        <TextField
                            name="cost_description"
                            value={cost_description}
                            size="s"
                            width="full"
                            className="RowInput"
                            onChange={({ e }: any) => { handleCostOverheadPropText(cost_id, e.target.name, e.target.value) }}
                            status={(isValidateOn && (parseFloat(cost_description) === 0)) ? 'alert' : undefined}
                            disabled = {requered}
                        />
                    </Layout>
                    <Layout flex={1} className="aic mr1">
                        <TextField
                            name="cost_value"
                            value={parseFloat(cost_value) === 0 ? "-" : cost_value}
                            size="s"
                            width="full"
                            className="textCenter RowInput"
                            onChange={({ e }: any) => { handleCostOverheadPropNumber(cost_id, e.target.name, e.target.value) }}
                            status={(isValidateOn && (parseFloat(cost_value) === 0)) ? 'alert' : undefined}
                        />
                        <Text className="ml05">%</Text>
                    </Layout>
                    <Layout className="jcc aic" style={{width:'40px'}}>
                        {requered ? ( "" ) : (
                            <Button
                                onlyIcon={true}
                                title="Удалить"
                                iconLeft={IconTrash}
                                onClick={() => delModalOpen(cost_id)}
                                view="ghost" />
                            )
                        }
                    </Layout>
                </Layout>
            ))}


            <hr />
            <Layout className="generatedTable">
                <Layout flex={2} direction="column">
                    <Layout className="tableHeader">
                        <Layout className="tar">
                            <Text className="label">
                                Наименование расценки
                            </Text>
                        </Layout>
                    </Layout>
                    {stags.map(({ units }) => (
                        units.map(curUnit => (
                            <Layout className="Row mb1" key={curUnit.opr_usl_unit}>
                                <TextField
                                    name="name"
                                    value={curUnit.opr_usl_unit}
                                    size="s"
                                    width="full"
                                    disabled
                                />
                            </Layout>
                        ))
                    ))}
                </Layout>
                <Layout flex={5} direction="column">
                    <Layout className="tableHeader">
                        {itemList.map(({ cost_id, cost_description, cost_value }) => (
                            <Layout flex={1} key={cost_id}>
                                <Text className="label">{cost_description}</Text>
                            </Layout>
                        ))}
                    </Layout>
                    {stags.map(({ units }, index) => (
                        units.map(curUnit => (
                            <Layout className="Row mb1 generated_cell jcc aic acc" key={curUnit.opr_usl_unit}>
                                {itemList.map(({ cost_id, cost_description, cost_value, cost_array }) => (
                                    <Layout
                                        key={`${curUnit.opr_usl_unit}_${cost_id}`}
                                        className="jcc aic acc">
                                        <Text>
                                            {cost_array.length > 0 ? numberWithSpaces(cost_array[cost_array.findIndex((List: ICostArray) => List.cost_name === curUnit.opr_usl_unit)].value) : 0}
                                        </Text>
                                    </Layout>
                                ))}
                            </Layout>
                        ))
                    ))}
                </Layout>
            </Layout>


            {/* <div className="scrollBlock">
                {stags.map(({ units }) => (
                    units.map(curUnit => (
                        <Layout className="Row mb1" key={curUnit.opr_usl_unit}>
                            <Layout flex={2}>
                                <TextField
                                    name="name"
                                    value={curUnit.opr_usl_unit}
                                    size="s"
                                    width="full"
                                    disabled
                                />
                            </Layout>
                            <Layout className="scrollBlockHor">
                                {itemList.map(({ cost_id, cost_description, cost_value }) => (
                                    <Layout flex={1} 
                                        key={`${curUnit.opr_usl_unit}_${cost_id}`}
                                        className="jcc aic">
                                        <Text className="label">

                                        </Text>
                                    </Layout>
                                ))}
                            </Layout>
                        </Layout>
                    ))
                ))}
            </div> */}
            <hr />
            <Layout>
                <Layout flex={8}></Layout>
                <Layout flex={10} className="SubSummFooter">
                    <Layout flex={1} className="aic jcc">Итого</Layout>
                    {/* <Layout flex={1} className="aic jcc mr1">{parseFloat(currentStage.stagSumm) == 0 ? "-- --" : currentStage.stagSumm}</Layout>*/}
                    <Layout flex={1} className="aic jcc">-- --</Layout>
                    <Layout flex={1} className="aic jcc">-- --</Layout>
                    <Layout flex={1} className="aic jcc">-- --</Layout>
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

export default TabCostOverhead;