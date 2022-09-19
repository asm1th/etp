
import React, { useState } from "react";
import { Layout } from "@consta/uikit/LayoutCanary";
import { TextField } from "@consta/uikit/TextField";
import { Tabs } from '@consta/uikit/Tabs';
import { Text } from '@consta/uikit/Text';
import { Button } from "@consta/uikit/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './ZayavkaForm.css'
import { Table, TableColumn, TableControl } from '@consta/uikit/Table';
import { Checkbox } from '@consta/uikit/Checkbox';

const rows = [
    {
        id: '1',
        num: '1',
        name: 'Документально провавое обеспечение',
        critNum: '4',
        status: true,
        menge: 'шт',
        treb: '',
        docs: '',
        answer: '',
        tip: ''
    },
    {
        id: '2',
        num: '2',
        name: 'Предложение о сроках выполнения работ',
        critNum: '3',
        status: true,
        menge: 'шт',
        treb: '',
        docs: '',
        answer: '',
        tip: ''
    },{
        id: '3',
        num: '3',
        name: 'Финансовые показатели',
        critNum: '1',
        status: true,
        menge: 'шт',
        treb: '',
        docs: '',
        answer: '',
        tip: ''
    },
];



const columns: TableColumn<typeof rows[number]>[] = [
{
        title: '',
        accessor: 'id',
        align: 'center',
        width: 30,
        // control: ({ column }: TableControl<{}>) => (
        //     <Checkbox checked={false} />
        // ),
    },{
        title: '№ п/п',
        accessor: 'num',
        sortable: true,
        width: 30,
    },{
        title: 'Наименование',
        accessor: 'name',
        sortable: true,
    },{
        title: 'Кол-во критериев',
        accessor: 'critNum',
        sortable: true,
    },{
        title: 'Статус',
        accessor: 'status',
        sortable: true,
    },{
        title: 'Единица измерения',
        accessor: 'menge',
        sortable: true,
    },{
        title: 'Требования заказчика',
        accessor: 'treb'
    },{
        title: 'Подтвержд. документы',
        accessor: 'docs'
    },{
        title: 'Ответ',
        accessor: 'answer'
    },{
        title: 'Пояснение',
        accessor: 'tip'
    },


];

const ZayavkaFormCriterions = () => {

    return (
        <>
            <Text size="l" className="mb1 mt2">Квалификационно - технические требования</Text>
            <Table rows={rows} columns={columns} isResizable />
        </>
    )
}

export default ZayavkaFormCriterions;

