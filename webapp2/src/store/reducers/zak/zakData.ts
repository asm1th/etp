import { IZak, IProc, ILot, IFile, IZakForm, IZakCriterionsRow, IDocsRow, IDocFile, IZakPrice } from "./IZak"



export const files: IFile[] = [{
    fileName: "Приложение №2 Техническое задание.7z",
    fileExtension: "zip",
    fileDescription: "1,5 Mб  21.02.2019, 14:12"
}, {
    fileName: "Извещение-48-ОНПЗ.doxc",
    fileExtension: "doc",
    fileDescription: "1,5 Mб  21.02.2019, 14:12"
}, {
    fileName: "Приложение №1 Проект формы договора.7z",
    fileExtension: "zip",
    fileDescription: "1,5 Mб  21.02.2019, 14:12"
}, {
    fileName: "Информационное письмо-48-ОНПЗ.pdf",
    fileExtension: "pdf",
    fileDescription: "1,5 Mб  21.02.2019, 14:12"
}]

export const lots: ILot[] = [{
    id: "10000042873",
    title: "Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»",
    descr: "Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»",
    status: "Заявка не подана",
    num: "1",
    price: "111",
    price_nds: "112",
    full_price: "113",
    waers: "RUB",
    closed: false,
    start_date: "11.02.2020",
    start_time: "9:10",
    files: files
}, {
    id: "10000042874",
    title: "лот 2",
    descr: "Описания лота 2",
    status: "Заявка подана",
    num: "2",
    price: "111",
    price_nds: "112",
    full_price: "113",
    waers: "RUB",
    closed: true,
    start_date: "11.02.2020",
    start_time: "9:10",
    files: files
}]

export const procList: IProc[] = [{
    id: '10000042371',
    title: 'АО «Газпромнефть-ОНПЗ»',
    num: '01-0017504-300-2020',
    desc: 'Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»',
    date_start: '17.02.2020',
    date_start_time: '12:00',
    date_end: '03.03.2020',
    date_end_time: '12:00',
    status: 'Завершена',
    lots: lots
}, {
    id: '10000042372',
    title: 'АО «Газпромнефть МЗСМ»',
    num: '01-0089872-309-2022',
    desc: 'Оказание консультационных услуг по доработке действующей системы энергетического менеджмента на соответствие требованиям меж...',
    date_start: '01.03.2022',
    date_start_time: '12:00',
    date_end: '03.03.2020',
    date_end_time: '12:00',
    status: 'Заявка подана',
    lots: lots
}, {
    id: '10000042373',
    title: 'ПАО «Газпромнефть»',
    num: '01-0082996-204-2021',
    desc: 'Открытый двухэтапный конкурентный отбор в электронной форме на право заключения договора на выполнение работ по услуге 11037...',
    date_start: '11.11.2021',
    date_start_time: '12:00',
    date_end: '03.03.2020',
    date_end_time: '12:00',
    status: 'Заявка не подана',
    lots: lots
}]

export const zakForm: IZakForm = {
    fio: "",
    phone: "",
    address: "",
    email: ""
}

export const criterions: IZakCriterionsRow[] = [
    {
        "id": '1',
        "num": '1',
        "name": 'Документально провавое обеспечение',
        "critNum": '4',
        "status": true,
        "menge": '',
        "treb": '',
        "docs": '',
        "answer": '',
        "answer_descr": '',
        "action": false,
        "rows": [
            {
                "id": '1.1',
                "num": '1',
                "name": 'Документально провавое 2',
                "critNum": '4',
                "status": true,
                "menge": 'шт',
                "treb": '',
                "docs": '',
                "answer": '',
                "answer_descr": '',
                "action": true,
                "rows": []
            }, {
                "id": '1.2',
                "num": '2',
                "name": 'Документально провавое 2',
                "critNum": '4',
                "status": true,
                "menge": 'шт',
                "treb": '',
                "docs": '',
                "answer": '',
                "answer_descr": '',
                "action": true,
                "rows": []
            }]
    }, {
        "id": '2',
        "num": '2',
        "name": 'Предложение о сроках выполнения работ',
        "critNum": '3',
        "status": false,
        "menge": '',
        "treb": '',
        "docs": '',
        "answer": '',
        "answer_descr": '',
        "action": false,
        "rows": [
            {
                "id": '2.1',
                "num": '1',
                "name": 'Гражданская правоспособность участника (учредительные документы и изменения)',
                "critNum": '4',
                "status": true,
                "menge": 'шт',
                "treb": 'Участник закупки должен обладать гражданской правоспособностью',
                "docs": 'Про документы',
                "answer": 'Да',
                "answer_descr": 'Начинаем начинать',
                "action": true,
                "rows": []
            }, {
                "id": '2.2',
                "num": '2',
                "name": 'Предложение по срокам окозания услуг',
                "critNum": '4',
                "status": true,
                "menge": 'шт',
                "treb": '',
                "docs": 'Про документы',
                "answer": 'Нет',
                "answer_descr": 'Получилось то что получилось',
                "action": true,
                "rows": []
            }
        ]
    }, {
        "id": '3',
        "num": '3',
        "name": 'Финансовые показатели',
        "critNum": '1',
        "status": false,
        "menge": '',
        "treb": '',
        "docs": '',
        "answer": '',
        "answer_descr": '',
        "action": false,
        "rows": []
    },
]

export const docFiles: IDocFile[] = [{
    fileName: "Заявка на участие.pdf",
    fileExtension: "pdf",
    fileBody: "",
    fileCreated: "10.10.2022",
    fileUser: "IVANOVII"
}]

export const docs: IDocsRow[] = [{
    "id": '1',
    "num": '1',
    "reqired": true,
    "title": 'Заявка на участие в конкурентном отборе',
    "ki": false,
    "format": 'pdf, word',
    "fileName": 'Заявка на участие.pdf',
    "file": docFiles,
    "action": true
},
{
    "id": '2',
    "num": '2',
    "reqired": true,
    "title": 'Техническое предложение',
    "ki": false,
    "format": 'pdf, word',
    "fileName": 'Техническое предложение.word',
    "file": docFiles,
    "action": true
},
{
    "id": '3',
    "num": '3',
    "reqired": false,
    "title": 'Опись документов',
    "ki": false,
    "format": 'pdf',
    "fileName": 'Опись документов.pdf',
    "file": docFiles,
    "action": true
},
{
    "id": '4',
    "num": '4',
    "reqired": true,
    "title": 'Ценовое предложение',
    "ki": true,
    "format": 'pdf, word, xls',
    "fileName": 'Ценовое предложение.word',
    "file": docFiles,
    "action": true
},
{
    "id": '5',
    "num": '5',
    "reqired": false,
    "title": 'Анкета участника',
    "ki": false,
    "format": 'pdf, word',
    "fileName": 'Анкета.pdf',
    "file": docFiles,
    "action": true
},
{
    "id": '6',
    "num": '6',
    "reqired": true,
    "title": 'Согласие на обработку персональных данных',
    "ki": false,
    "format": 'pdf',
    "fileName": 'Согласие на обработку персональных данных.pdf',
    "file": docFiles,
    "action": true
},
{
    "id": '7',
    "num": '7',
    "reqired": true,
    "title": 'Соглашение о конфиденциальности',
    "ki": false,
    "format": 'pdf',
    "fileName": 'Соглашение о конфиденциальности.pdf',
    "file": docFiles,
    "action": true
},
{
    "id": '8',
    "num": '8',
    "reqired": true,
    "title": 'Доверенность',
    "ki": false,
    "format": 'pdf',
    "fileName": 'Приложение.pdf',
    "file": docFiles,
    "action": true
},
]

export const zakPrice: IZakPrice = {
    waers: "",
    price: "",
    price_vat: "",
    date_start_from: "",
    date_start_to: "",
    date_end_from: "",
    date_end_to: "",
    vat: "",
    isVat: false,
    full_price: "",
    full_price_vat: ""
}

export const initialState: IZak = {
    procList: procList,
    zakForm: zakForm,
    criterions: criterions,
    docs: docs,
    zakPrice: zakPrice
}