import { FC } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";
import { Card } from "@consta/uikit/Card";
import { DatePicker } from '@consta/uikit/DatePickerCanary';
import { Switch } from '@consta/uikit/Switch';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { sampSlice } from "../../store/reducers/main/sampSlice";
import { format } from "date-fns";
import WaersSelect from "../controls/WaersSelect";


const SampKpInfo: FC = () => {
    const dispatch = useAppDispatch()
    const {usl_period_end, links, isTravel} = useAppSelector(state => state.sampReducer)

    const handleTravel = (e: any) => {
        dispatch(sampSlice.actions.setTravelChecked(e.checked))
    }

    const handleDate = (value: any) => {
        dispatch(sampSlice.actions.setKp_offer_expire_date( format(value, 'yyyy-MM-dd')))
    }

    return (
        <div>
            <Card verticalSpace="m" horizontalSpace="l" shadow={false} className="TopBar">
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
                            className="rangeInput mr2" />
                        <WaersSelect/>
                        <Text
                            size="s"
                            className="mr1 ml1">
                            Командировочные расходы
                        </Text>
                        <Switch
                            checked={isTravel}
                            onChange={handleTravel}
                            size="m" />
                    </Layout>
                </Layout>
            </Card>
        </div>
    );
};

export default SampKpInfo;