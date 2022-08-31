import React, { FC, useState } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Card } from "@consta/uikit/Card";
import { DatePicker } from '@consta/uikit/DatePickerCanary';
import { Select } from '@consta/uikit/Select';
import { Switch } from '@consta/uikit/Switch';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { mainSlice } from "../../store/reducers/main/mainSlice";
import { format } from "date-fns";

const TopBar: FC = () => {
    const dispatch = useAppDispatch()
    const {trip, dateContract, dateKP, valutaKP} = useAppSelector(state => state.mainReducer)

    type Item = {
        label: string;
        id: number;
    };
    const items: Item[] = [
        {
            label: 'RUB',
            id: 1,
        },
        {
            label: 'USD',
            id: 2,
        },
        {
            label: 'YUN',
            id: 3,
        },
    ];
    const [val, setVal] = useState<Item | null>(items[0]);

    const handleTrip = ({ e }: any) => {
        dispatch(mainSlice.actions.toggleChecked(e.target.checked))
    }

    const handleDate = ({ e }: any) => {
        dispatch(mainSlice.actions.setDateKP(e.target.value))
    }

    return (
        <div>
            <Card verticalSpace="m" horizontalSpace="m" shadow={false} className="TopBar">
                <Layout className="aic">
                    <Layout className="aic flexGrow1">
                        <Text
                            className={`Title ${cnMixSpace({ mR: 'm', })}`}>
                            Коммерческое предложение
                        </Text>
                        <Text size="s" className={`subTitle ${cnMixSpace({ mR: 'm', })}`}>
                            Срок действия договора: {format(dateContract, 'dd.MM.yyyy')}
                        </Text>
                    </Layout>
                    <Layout flex={2} className="aic jce">
                        {/* <TextField placeholder="" label="Срок действия КП" labelPosition="left" /> */}
                        <DatePicker
                            value={dateKP}
                            onChange={handleDate}
                            labelPosition="left"
                            label="Срок действия КП"
                            leftSide={IconCalendar}
                            size="s"
                            className={`rangeInput ${cnMixSpace({ mR: 'm', })}`} />
                        <Select
                            placeholder="Валюта"
                            view="default"
                            items={items}
                            value={val}
                            onChange={({ value }) => setVal(value)}
                            labelPosition="left"
                            label="Валюта"
                            style={{ width: '165px' }}
                            size="s"
                            className={`valSelect ${cnMixSpace({ mR: 'm', })}`} />
                        <Text
                            size="s"
                            className={`Title ${cnMixSpace({ mR: 'm', })}`}>
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