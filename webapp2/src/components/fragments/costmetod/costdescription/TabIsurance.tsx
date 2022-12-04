import { FC } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { Layout } from "@consta/uikit/Layout";
import { TextField } from "@consta/uikit/TextField";
import { sampSlice } from "../../../../store/reducers/samp/sampSlice";
import { numberWithSpaces } from "../../../../helpers";
import SaveCostButton from "../SaveCostButton";


const TabIsurance: FC = () => {
    const dispatch = useAppDispatch()
    const {
        costs,
        cost_sums,
        isValidateOn } = useAppSelector(state => state.sampReducer)

    const handleOms = (value: string) => {
        if (value === '' || value.match(/^([0-9]{1,3})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setCntrbOms({ cntrb_oms: parseInt(value) > 100 ? "100" : value }))
        }
    }
    const handlePension = (value: string) => {
        if (value === '' || value.match(/^([0-9]{1,3})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setPension({ cntrb_pension: parseInt(value) > 100 ? "100" : value }))
        }
    }
    const handleDisability = (value: string) => {
        if (value === '' || value.match(/^([0-9]{1,3})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setDisability({ cntrb_disability: parseInt(value) > 100 ? "100" : value }))
        }
    }

    return (
        <>
            <Text as="div" size="l" className="mb1 weight700">
                Страховые взносы
            </Text>
            <Layout className="Row mb1">
                <Layout flex={5} className="aic">
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text>
                        Взносы в фонд обязательного медицинского страхования
                    </Text>
                </Layout>
                <Layout flex={1} className="aic">
                    <TextField
                        name="cntrb_oms"
                        value={parseFloat(costs.cntrb_oms) == 0 ? "-" : costs.cntrb_oms}
                        size="s"
                        width="full"
                        className="textCenter"
                        onChange={({ e }: any) => handleOms(e.target.value)}
                        status={(isValidateOn && (parseFloat(costs.cntrb_oms) === 0)) ? 'alert' : undefined}
                    />
                    <Text className="ml05">%</Text>
                </Layout>
                <Layout flex={5}></Layout>
            </Layout>
            <Layout className="Row mb1">
                <Layout flex={5} className="aic">
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text>
                        Взносы в пенсионный фонд
                    </Text>
                </Layout>
                <Layout flex={1} className="aic">
                    <TextField
                        name="cntrb_pension"
                        value={parseFloat(costs.cntrb_pension) == 0 ? "-" : costs.cntrb_pension}
                        size="s"
                        width="full"
                        className="textCenter"
                        onChange={({ e }: any) => handlePension(e.target.value)}
                        status={(isValidateOn && (parseFloat(costs.cntrb_pension) === 0)) ? 'alert' : undefined}
                    />
                    <Text className="ml05">%</Text>
                </Layout>
                <Layout flex={5}></Layout>
            </Layout>
            <Layout className="Row mb1">
                <Layout flex={5} className="aic">
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text>
                        Отчисления по временной нетрудоспособности и в связи с материнством
                    </Text>
                </Layout>
                <Layout flex={1} className="aic">
                    <TextField
                        name="cntrb_disability"
                        value={parseFloat(costs.cntrb_disability) == 0 ? "-" : costs.cntrb_disability}
                        size="s"
                        width="full"
                        className="textCenter"
                        onChange={({ e }: any) => handleDisability(e.target.value)}
                        status={(isValidateOn && (parseFloat(costs.cntrb_disability) === 0)) ? 'alert' : undefined}
                    />
                    <Text className="ml05">%</Text>
                </Layout>
                <Layout flex={5}></Layout>
            </Layout>

            <Layout className="tableHeader">
                <Layout flex={4} className="tar">
                    <Text className="label">
                        Наименование расценки
                    </Text>
                </Layout>
                <Layout flex={1}>
                    <Text className="label">Взносы в фонд ОМС,<br />руб./мес.</Text>
                </Layout>
                <Layout flex={1}>
                    <Text className="label">Взносы в пенсионный фонд,<br />руб./мес.</Text>
                </Layout>
                <Layout flex={1}>
                    <Text className="label">Отчисления по временной<br />нетрудоспособности, руб./мес.</Text>
                </Layout>
            </Layout>
            <div className="scrollBlock">
                {costs.salary.map(({ kp_unit_guid, cost_name, cntrb_oms, cntrb_pension, cntrb_disability }) => (
                    <Layout className="Row mb1" key={kp_unit_guid}>
                        <Layout flex={4}>
                            <TextField
                                name="cost_name"
                                value={cost_name}
                                size="s"
                                width="full"
                                disabled
                            />
                        </Layout>
                        <Layout flex={1} className="jcc aic">
                            <Text>{parseFloat(cntrb_oms) == 0 ? "-- --" : numberWithSpaces(cntrb_oms)}</Text>
                        </Layout>
                        <Layout flex={1} className="jcc aic">
                            <Text>{parseFloat(cntrb_pension) == 0 ? "-- --" : numberWithSpaces(cntrb_pension)}</Text>
                        </Layout>
                        <Layout flex={1} className="jcc aic">
                            <Text>{parseFloat(cntrb_disability) == 0 ? "-- --" : numberWithSpaces(cntrb_disability)}</Text>
                        </Layout>
                    </Layout>
                ))}
            </div>
            <hr />
            <Layout>
                <Layout flex={4}>
                    <Layout></Layout>
                    <Layout className="aic jcc SubSummFooterLabel">Итого</Layout>
                </Layout>
                <Layout flex={1} className="aic jcc SubSummFooter">{parseFloat(cost_sums.cost_insurance.sum_cntrb_oms) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_insurance.sum_cntrb_oms)}</Layout>
                <Layout flex={1} className="aic jcc SubSummFooter">{parseFloat(cost_sums.cost_insurance.sum_cntrb_pension) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_insurance.sum_cntrb_pension)}</Layout>
                <Layout flex={1} className="aic jcc SubSummFooter SubSummFooterLast">{parseFloat(cost_sums.cost_insurance.sum_cntrb_disability) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_insurance.sum_cntrb_disability)}</Layout>
            </Layout>

            <SaveCostButton/>
        </>
    );
};

export default TabIsurance;