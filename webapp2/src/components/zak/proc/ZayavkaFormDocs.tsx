
import React, { useState } from "react";
import { Text } from '@consta/uikit/Text';
import { Button } from "@consta/uikit/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './ZayavkaForm.css'
import { Table, TableColumn } from '@consta/uikit/Table';
import { Checkbox } from '@consta/uikit/Checkbox';
import { IconCheck } from '@consta/uikit/IconCheck';
import { IconClose } from '@consta/uikit/IconClose';
import { Link } from 'react-router-dom';
import { IconTrash } from '@consta/uikit/IconTrash';
import { IconAdd } from '@consta/uikit/IconAdd';
import { IconSave } from "@consta/uikit/IconSave";
import { zakSlice } from "../../../store/reducers/zak/zakSlice";
import { IDocsRow, IZakFormTab } from "../../../store/reducers/zak/IZak";



const ZayavkaFormDocs = () => {
    const dispatch = useAppDispatch()
    const { docs: rows, zakFormTabs } = useAppSelector(state => state.zakReducer)

    const handleFileClick = (row: any) => {

    }

    const handleRowAdd = (row: any) => {

    }

    const handleRowDel = (row: any) => {

    }

    const columns: TableColumn<typeof rows[number]>[] = [
        {
            title: 'id',
            accessor: 'id',
            align: 'center',
            width: 100,
            hidden: true
            //renderCell: (row:any) => <><Checkbox checked={false} /></>,
        }, {
            title: '№ п/п',
            accessor: 'num',
            sortable: true,
            //width: 100,
        }, {
            title: 'Обязательные',
            accessor: 'reqired',
            sortable: true,
            renderCell: (row: any) => <>{row.reqired ? <IconCheck size="s" view="success" /> : <IconClose size="s" view="alert" />}</>,
        }, {
            title: 'Вид документа',
            accessor: 'title',
            sortable: true,
        }, {
            title: 'Содержит КИ',
            accessor: 'ki',
            renderCell: (row: any) => <>{row.ki ? <><Checkbox checked={row.ki} /></> : null}</>,
        }, {
            title: 'Форма предоставления',
            accessor: 'format'
        }, {
            title: 'Файл',
            accessor: 'fileName',
            renderCell: (row: any) => <><Link to="#" onClick={(e: any) => handleFileClick(row)}>{row.fileName}</Link></>,
        }, {
            title: '',
            accessor: 'action',
            renderCell: (row: any) => <>{row.action ? <><Button size="s" view="clear" onClick={(e: any) => handleRowAdd(row)} iconLeft={IconAdd} /><Button size="s" view="clear" onClick={(e: any) => handleRowDel(row)} iconLeft={IconTrash} /></> : null}</>
        }
    ];

    const sendDocs = () => {
        console.log(rows);
        if (validateTable(rows)) {
            dispatch(zakSlice.actions.setZakFormTabValid({ tabId: 2, isValid: true }))
            alert("Данные сохранены")
            setTab(zakFormTabs[3])
        }
    }

    const validateTable = (rows: IDocsRow[]) => {
        return rows.length > 0
    }

    const setTab = (tab:IZakFormTab) => {
        dispatch(zakSlice.actions.setZakFormCurrentTab({ tab: tab }))
    }

    return (
        <>
            <Text size="m" className="mb1 mt2">Перечень документов для загрузки</Text>
            <Table rows={rows} columns={columns} borderBetweenRows />
            <Button
                onClick={sendDocs}
                label="Сохранить документы"
                iconLeft={IconSave} 
                className="mt1" />
        </>
    )
}

export default ZayavkaFormDocs;

