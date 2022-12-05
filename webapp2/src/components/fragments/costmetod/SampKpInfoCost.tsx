import { FC } from "react";
import { Layout } from '@consta/uikit/Layout';
import { Text } from "@consta/uikit/Text";
import { Card } from "@consta/uikit/Card";
import { DatePicker } from '@consta/uikit/DatePicker';
import { Switch } from '@consta/uikit/Switch';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { sampSlice } from "../../../store/reducers/samp/sampSlice";
import { format } from "date-fns";
import WaersSelect from "../WaersSelect"


const SampKpInfoCost = (props: { isTravelShow: boolean }) => {
    const dispatch = useAppDispatch()
    const { usl_period_end, links, isTravel } = useAppSelector(state => state.sampReducer)

    const handleTravel = (e: any) => {
        dispatch(sampSlice.actions.setTravelChecked(e.checked))
    }

    const handleDate = (value: any) => {
        dispatch(sampSlice.actions.setKp_offer_expire_date(value && format(value, 'yyyy-MM-dd')))
    }

    return (
        <Card verticalSpace="m" horizontalSpace="2xl" shadow={false} className="TopBar">
            <Layout className="aic jcsb">
                <Layout className="aic">
                    <Text
                        className="Title mr1">
                        Коммерческое предложение
                    </Text>
                    <Text size="s" className="subTitle mr">
                        Срок действия договора: <span className="bold"> {usl_period_end && format(new Date(usl_period_end), 'dd.MM.yyyy')}</span>
                    </Text>
                </Layout>
                <Layout className="aic jce">
                    {/* <TextField placeholder="" label="Срок действия КП" labelPosition="left" /> */}
                    <DatePicker
                        value={links.kp_offer_expire_date ? new Date(links.kp_offer_expire_date) : undefined}
                        onChange={({ value }) => handleDate(value)}
                        labelPosition="left"
                        label="Срок действия КП"
                        leftSide={IconCalendar}
                        size="s"
                        className="rangeInput mr2"
                        required
                        status={links.kp_offer_expire_date ? undefined : 'alert'}
                    />
                    <WaersSelect />
                    {props.isTravelShow ? (
                        <>
                            <Text
                                size="s"
                                className="mr1 ml1">
                                Командировочные расходы
                            </Text>
                            <Switch
                                checked={isTravel}
                                onChange={handleTravel}
                                size="m" />
                        </>
                    ) : null}
                </Layout>
            </Layout>
        </Card>
    );
};

export default SampKpInfoCost;