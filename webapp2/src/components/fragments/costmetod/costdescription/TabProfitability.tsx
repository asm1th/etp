import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useUpdateLinkMutation, useUpdateUsrpMutation } from "../../../../services/SampService";
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconCheck } from '@consta/uikit/IconCheck';
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import { format } from "date-fns";
import { ICostOverhead } from "../../../../models/ISamp";
import { IconTrash } from "@consta/uikit/IconTrash";
import { IconAdd } from "@consta/uikit/IconAdd";
import { Modal } from "@consta/uikit/Modal";
import PopoverCustom from "../../../util/PopoverCustom";
import { IconInfo } from "@consta/uikit/IconInfo";
import { sampSlice } from "../../../../store/reducers/samp/sampSlice";
import { numberWithSpaces } from "../../../../helpers";



const TabProfitability: FC = () => {
    const dispatch = useAppDispatch()
    const { stags, cost, isValidateOn, salary } = useAppSelector(state => state.sampReducer)
    const [updateLink, { isLoading: isUpdatingLink }] = useUpdateLinkMutation()
    const [updateUsrp, { isLoading: isUpdatingUsrp }] = useUpdateUsrpMutation()

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)
    const msg = "Рентабельность рассчитывается\n от общей суммы"
    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };

    const [savedDate, setSavedDate] = useState<string>("")
    const onSave = () => {
        //

        setSavedDate(format(new Date(), 'dd.MM.yyyy HH:mm:ss'))
    }

    const handleProfitability = (value: string) => {
        if (value === '' || value.match(/^([0-9]{1,3})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setProfitability({ profitability: parseInt(value) > 100 ? "100" : value }))
        }
    }

    
    return (
        <>
            <PopoverCustom position={position} text={msg} />
            <Text as="div" size="l" className="mb1 weight700">
                Рентабельность
            </Text>
            <Layout className="Row mb1">
                <Layout className="aic">
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text>
                        Рентабельность
                    </Text>
                    <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                </Layout>
                <Layout className="aic ml1">
                    <TextField
                        name="profitability"
                        value={parseFloat(cost.profitability) == 0 ? "-" : cost.profitability} 
                        size="s"
                        width="full"
                        className="textCenter"
                        onChange={({ e }: any) => handleProfitability(e.target.value)}
                        status={(isValidateOn && (parseFloat(cost.profitability) === 0)) ? 'alert' : undefined}
                    />
                    <Text className="ml05">%</Text>
                </Layout>
                <Layout></Layout>
            </Layout>
            
            <Layout className="tableHeader">
                <Layout flex={6} className="tar">
                    <Text className="label">
                        Наименование расценки
                    </Text>
                </Layout>
                <Layout flex={1}>
                    <Text className="label">Рентабельность, руб./мес.</Text>
                </Layout>
                
            </Layout>

            <div className="scrollBlock">
                {salary.map(({ kp_unit_guid, cost_name, profitability }) => (
                        <Layout className="Row mb1" key={kp_unit_guid}>
                            <Layout flex={6}>
                                <TextField
                                    name="name"
                                    value={cost_name}
                                    size="s"
                                    width="full"
                                    disabled
                                />
                            </Layout>
                            <Layout flex={1} className="jcc aic">
                                <Text>{numberWithSpaces(profitability)}</Text>
                            </Layout>
                        </Layout>
                ))}
            </div>
            <hr/>

            <Layout>
                <Layout flex={9}></Layout>
                <Layout flex={3} className="SubSummFooter">
                    <Layout flex={1} className="aic jcc">Итого</Layout>
                    {/* <Layout flex={1} className="aic jcc mr1">{parseFloat(currentStage.stagSumm) == 0 ? "-- --" : currentStage.stagSumm}</Layout>*/}
                    <Layout flex={1} className="aic jcc">{numberWithSpaces("0")}</Layout>
                </Layout>
            </Layout>

            <Layout flex={4} className="aic jcfe mt1">
                {savedDate ? (
                    <Text className="mr1 ml1 label tar">Сохранено {savedDate}</Text>
                ) : null}
                <Button label="Сохранить изменения" onClick={onSave} size="m" iconLeft={IconCheck} loading={isUpdatingLink || isUpdatingUsrp} />
            </Layout>

        </>
    );
};

export default TabProfitability;