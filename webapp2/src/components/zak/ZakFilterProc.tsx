import React, { useState } from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconTop } from '@consta/uikit/IconTop';
import { IconDown } from '@consta/uikit/IconDown';
import { useAppSelector } from "../../hooks/redux";
import './ZakFilterProc.css'
import { TextField } from "@consta/uikit/TextField";
import { Select } from '@consta/uikit/Select';
import { Breadcrumbs } from '@consta/uikit/BreadcrumbsCanary';
import { DatePicker } from '@consta/uikit/DatePickerCanary';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { Button } from "@consta/uikit/Button";
import { IconSearch } from '@consta/uikit/IconSearch';
import { Checkbox } from '@consta/uikit/Checkbox';



const pagesNoIcon = [{
    label: 'Главная',
    href: '/etp',
}, {
    label: 'Закупочные процедуры',
    href: '/etp/zak',
}]

type Item = {
    label: string;
    id: number;
};

const items: Item[] = [{
    label: 'Первый',
    id: 1,
}, {
    label: 'Второй',
    id: 2,
}];

const ZakFilterProc = () => {
    const [value, setValue] = useState<Item | null>();
    const [date1, setDate1] = useState<[Date?, Date?] | null>(null);
    const handleDate = (value: any) => {
        //dispatch(sampSlice.actions.setKp_offer_expire_date(format(value, 'yyyy-MM-dd')))
    }
    const handleFilter = () => {
        alert("фильтруем")
    }
    const handleClearFilter = () => {
        alert("очищаем")
    }

    return (
        <div className="topFilter">
            <Breadcrumbs items={pagesNoIcon} size="s" className="mb2" />
            <Text size="m" className="Title mb2 mt1">Закупочные процедуры по услугам и работам</Text>
            <Layout className="topFilterCenter pb1 mb1">
                <Layout flex={1} className='topFilterCol'>
                    <Select
                        label="Организатор"
                        placeholder="Выберите значение"
                        size="s"
                        items={items}
                        value={value}
                        onChange={({ value }) => setValue(value)}
                    />
                </Layout>
                <Layout flex={1} className='topFilterCol ml2 mr2'>
                    <Select
                        label="Статус процедуры"
                        placeholder="Выберите статус процедуры"
                        size="s"
                        items={items}
                        value={value}
                        onChange={({ value }) => setValue(value)}
                    />
                </Layout>
                <Layout flex={1} className='topFilterCol'>
                    <Select
                        label="Статус участия"
                        placeholder="Выберите статус участия"
                        size="s"
                        items={items}
                        value={value}
                        onChange={({ value }) => setValue(value)}
                    />
                </Layout>
            </Layout>
            <Layout flex={1} className="topFilterCenter pb2">
                <Layout direction="column" className='topFilterCol'>
                    <Text size="m">Процедура</Text>
                    <TextField label="id Процедуры" placeholder="10000042374" size="s" className="mt1"></TextField>
                    <TextField label="Реестровый № процедуры" placeholder="Введите реестровый № процедуры" size="s" className="mt1"></TextField>
                    <TextField label="Валюта" placeholder="Введите валюту" size="s" className="mt1"></TextField>
                </Layout>
                <Layout direction="column" className='topFilterCol  ml2 mr2'>
                    <Text size="m">Закупка</Text>
                    <Select
                        label="Категория закупки"
                        placeholder="Выберите категорию закупки"
                        size="s"
                        items={items}
                        value={value}
                        onChange={({ value }) => setValue(value)}
                        className="mt1"
                    />

                    <Select
                        label="Способ закупки"
                        placeholder="Выберите способ закупки"
                        size="s"
                        items={items}
                        value={value}
                        onChange={({ value }) => setValue(value)}
                        className="mt1"
                    />

                    <Select
                        label="Форма закупки"
                        placeholder="Выберите форму закупки"
                        size="s"
                        items={items}
                        value={value}
                        onChange={({ value }) => setValue(value)}
                        className="mt1"
                    />

                </Layout>
                <Layout direction="column" className='topFilterCol'>
                    <Text size="m">Дата приема заявок</Text>
                    <DatePicker
                        value={date1}
                        onChange={({ value }) => handleDate(value)}
                        labelPosition="top"
                        label="Начало приема"
                        leftSide={IconCalendar}
                        size="s"
                        type="date-range"
                        className="mt1" />
                    <DatePicker
                        value={date1}
                        onChange={({ value }) => handleDate(value)}
                        labelPosition="top"
                        label="Окончание приема"
                        leftSide={IconCalendar}
                        size="s"
                        type="date-range"
                        className="mt1" />


                </Layout>
            </Layout>
            <Layout className="topFilterFooter jcsb mt1">
                <Layout>
                    <Checkbox label="Отобразить архивные процедуры" checked={false}/>
                    <Checkbox label="Только конкурентные переговоры" checked={false} className="ml2"/>
                    <Checkbox label="Только технические переговоры" checked={false} className="ml2"/>
                </Layout>
                <Layout>
                    <Button className="mr1 ml1"
                        iconLeft={IconSearch}
                        iconSize="s"
                        size="s"
                        view="primary"
                        label="Найти"
                        onClick={handleFilter} />
                    <Button
                        iconSize="s"
                        size="s"
                        view="secondary"
                        label="Очистить фильтр"
                        onClick={handleClearFilter} />
                </Layout>
            </Layout>
        </div>
    );
};

export default ZakFilterProc;