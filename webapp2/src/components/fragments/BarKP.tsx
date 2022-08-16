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

const TopBar: FC = () => {
    const [value, setValue] = useState<Date | null>(new Date());

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

    const [komand, setKomand] = useState<boolean>(false);

    const handleKomand = ({ e }: any) => {
        console.log(e.target.checked)
        setKomand(e.target.checked)
    }

    const dispatch = useAppDispatch()
    const {trip} = useAppSelector(state => state.tripReducer)


    return (
        <div>
            <Card verticalSpace="m" horizontalSpace="m" shadow={false} className="TopBar">
                <Layout className="aic">
                    <Layout className="aic flexGrow1">
                        <Text
                            className={`Title ${cnMixSpace({ mR: 'm', })}`}>
                            Коммерческое предложение</Text>
                        <Text size="s" className={`subTitle ${cnMixSpace({ mR: 'm', })}`}>
                            Срок действия договора</Text>
                        <Text size="s">
                            17.09.2023</Text>
                    </Layout>
                    <Layout flex={1} className="aic">
                        {/* <TextField placeholder="" label="Срок действия КП" labelPosition="left" /> */}
                        <DatePicker
                            value={value}
                            onChange={({ value }) => setValue(value)}
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
                            size="s"
                            className={`valSelect ${cnMixSpace({ mR: 'm', })}`} />
                        <Text
                            size="s"
                            className={`Title ${cnMixSpace({ mR: 'm', })}`}>
                            Командировочные расходы
                        </Text>
                        <Switch
                            checked={komand}
                            onChange={handleKomand}
                            size="s" />
                    </Layout>
                </Layout>
            </Card>
        </div>
    );
};

export default TopBar;