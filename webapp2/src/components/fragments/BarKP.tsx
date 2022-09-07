import { FC, useEffect } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";
import { Card } from "@consta/uikit/Card";
import { DatePicker } from '@consta/uikit/DatePickerCanary';
import { Switch } from '@consta/uikit/Switch';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { mainSlice } from "../../store/reducers/main/mainSlice";
import { sampSlice } from "../../store/reducers/main/sampSlice";
import { format } from "date-fns";
import WaersSelect from "../controls/WaersSelect";
import { useUpdateLinkMutation, useUpdateUsrpMutation } from "../../services/SampService";


const TopBar: FC = () => {
    const dispatch = useAppDispatch()
    const {trip} = useAppSelector(state => state.mainReducer)
    const {usl_period_end, links} = useAppSelector(state => state.sampReducer)
    const [updateLink, { isLoading: isUpdating }] = useUpdateLinkMutation()

    useEffect(() => {
        dispatch(mainSlice.actions.toggleChecked(parseFloat(links.travel_exp) > 0))
    },[links, dispatch])

    const handleTrip = (e: any) => {
        dispatch(mainSlice.actions.toggleChecked(e.checked))
    }

    const handleDate = (value: any) => {
        dispatch(sampSlice.actions.setKp_offer_expire_date( format(value, 'yyyy-MM-dd')))
    }

    return (
        <div>
            <Card verticalSpace="m" horizontalSpace="m" shadow={false} className="TopBar">
                <Layout className="aic">
                    <Layout className="aic flexGrow1">
                        <Text
                            className="Title mr1">
                            Коммерческое предложение
                        </Text>
                        <Text size="s" className="subTitle mr1">
                            Срок действия договора:<br/>
                            {format(new Date(usl_period_end), 'dd.MM.yyyy')}
                        </Text>
                    </Layout>
                    <Layout flex={2} className="aic jce">
                        {/* <TextField placeholder="" label="Срок действия КП" labelPosition="left" /> */}
                        <DatePicker
                            value={links.kp_offer_expire_date ? new Date(links.kp_offer_expire_date) : undefined}
                            onChange={({ value }) => handleDate(value)}
                            labelPosition="left"
                            label="Срок действия КП"
                            leftSide={IconCalendar}
                            size="s"
                            className="rangeInput mr1" />
                        <WaersSelect/>
                        <Text
                            size="s"
                            className="Title mr1">
                            Командировочные расходы
                        </Text>
                        <Switch
                            checked={trip.isTrip}
                            onChange={handleTrip}
                            size="s" />
                    </Layout>
                </Layout>
            </Card>
        </div>
    );
};

export default TopBar;