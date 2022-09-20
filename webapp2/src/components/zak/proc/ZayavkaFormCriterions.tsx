
import React, { useState } from "react";
import { Layout } from "@consta/uikit/LayoutCanary";
import { TextField } from "@consta/uikit/TextField";
import { Text } from '@consta/uikit/Text';
import { Button } from "@consta/uikit/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './ZayavkaForm.css'
import { Table, TableColumn } from '@consta/uikit/Table';
import { IconCheck } from '@consta/uikit/IconCheck';
import { IconClose } from '@consta/uikit/IconClose';
import { IconAdd } from '@consta/uikit/IconAdd';
import { IconInfo } from '@consta/uikit/IconInfo';
import PopoverCustom from "../../util/PopoverCustom";
import { Tooltip } from '@consta/uikit/Tooltip';
import { Modal } from '@consta/uikit/Modal';
import { Select } from '@consta/uikit/Select';
import { IconAttach } from '@consta/uikit/IconAttach';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';



const msg = "Статус обработки данных"

const ZayavkaFormCriterions = () => {

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };
    ///

    const { criterions: rows } = useAppSelector(state => state.zakReducer)

    const columns: TableColumn<typeof rows[number]>[] = [
        {
            title: '№ п/п',
            accessor: 'id',
            align: 'center',
            width: 100,
            //hidden: true
            //renderCell: (row:any) => <><Checkbox checked={false} /></>,
        }, {
            title: '№ п/п',
            accessor: 'num',
            sortable: true,
            //width: 100,
            hidden: true
        }, {
            title: 'Наименование',
            accessor: 'name',
            sortable: true,
        }, {
            title: 'Кол-во критериев',
            accessor: 'critNum',
            sortable: true,
        }, {
            title: 'Статус',
            accessor: 'status',
            sortable: false,
            control: ({ column }) => (
                <div className="ml05" onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                    <IconInfo size="xs" view="ghost" />
                </div>
            ),
            //renderCell: (row: any) => <>{row.status ? <IconCheck size="s" view="success" ref={buttonRef}/> : <IconClose size="s" view="alert" />}</>,
            renderCell: (row: any) => <>{row.status ? <IconCheck size="s" view="success" /> : <IconClose size="s" view="alert" />}</>,
        }, {
            title: 'Единица измерения',
            accessor: 'menge',
            sortable: true,
        }, {
            title: 'Требования заказчика',
            accessor: 'treb'
        }, {
            title: 'Подтвержд. документы',
            accessor: 'docs',
            renderCell: (row: any) => <>{row.action ? <><Button view="clear" iconSize="s" iconLeft={IconAttach}/><Button view="clear" iconSize="s" iconLeft={IconDocFilled}/></> :null}</>,
        }, {
            title: 'Ответ',
            accessor: 'answer'
        }, {
            title: 'Пояснение',
            accessor: 'answer_descr'
        }, {
            title: 'Действие',
            accessor: 'action',
            renderCell: (row: any) => <>{row.action ? <Button size="m" view="clear" onClick={(e: any) => handleRowPlus(row)} iconLeft={IconAdd} /> : null}</>
        }
    ];

    const handleCell = (obj: any) => {
        //debugger
        //console.warn(JSON.stringify(obj, null, 2))
    }

    const handleRowPlus = (row: any) => {
        console.warn("click Plus: " + JSON.stringify(row))
        setIsModalOpen(true)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    type Item = {
        label: string;
        id: number;
    };

    const items: Item[] = [{
        label: 'Да',
        id: 1,
    }, {
        label: 'Нет',
        id: 2,
    }];

    const [answer, setAnswer] = useState<Item | null>();
    const [answer_descr, setAnswerDescr] = useState<any>();

    //const buttonRef = React.createRef()


    return (
        <>
            <PopoverCustom position={position} text={msg} />
            {/* <Tooltip size="s" anchorRef={buttonRef}>
                Контент тултипа
            </Tooltip> */}
            <Text size="l" className="mb1 mt2">Квалификационно - технические требования</Text>
            <Table rows={rows} columns={columns} borderBetweenRows onRowClick={handleCell} />

            <Modal
                isOpen={isModalOpen}
                hasOverlay
                onClickOutside={() => setIsModalOpen(false)}
                onEsc={() => setIsModalOpen(false)}>
                <Layout className="jcb">
                    <Text as="p" size="s" view="secondary" className="ModalTitle">
                        Ответ для критерия
                    </Text>
                    <Button
                        size="l"
                        view="clear"
                        iconLeft={IconClose}
                        onClick={() => setIsModalOpen(false)}
                    />
                </Layout>
                <div className="ModalContent">
                    <Select
                        label="Ответ"
                        placeholder="Выберите значение"
                        size="s"
                        items={items}
                        value={answer}
                        required={true}
                        onChange={({ value }) => setAnswer(value)}
                    />
                    <TextField
                        placeholder="Пояснение"
                        label="Пояснение к ответу"
                        size="s"
                        width="full"
                        type="textarea"
                        rows={7}
                        cols={50}
                        className="mt1" 
                        value={answer_descr}
                        onChange={({ value }) => setAnswerDescr(value)}
                        />
                </div>
                <div className="ModalFooter">
                    <Button
                        size="m"
                        view="primary"
                        label="Сохранить"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>
            </Modal>
        </>
    )
}

export default ZayavkaFormCriterions;

