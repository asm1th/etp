import React, { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Checkbox } from '@consta/uikit/Checkbox';
import { IconInfo } from '@consta/uikit/IconInfo';
import PopoverCustom from '../util/PopoverCustom';
// import ModalFZ from '../util/ModalFZ';
import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';

const Step2: FC = () => {
    const [accept, setAccept] = useState<boolean>(false);
    const handleAccept = (e: boolean) => setAccept(!accept);

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined);
    const [msg, setMsg] = useState<string>("");
    const handleMouseMove = (event: React.MouseEvent, msg: string) => {
        setPosition({ x: event.clientX, y: event.clientY });
        setMsg(msg);
    };
    const msg1 = "Узнайте больше о токене и для чего он нужен!"
    const msg2 = "Ознакомьтесь с Федеральным Законом РФ от \n 27.07.2006г. № 152-ФЗ «О персональных данных» "
    //.popover

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);


    type IOrg = {
        "resident": boolean,
        "individual": boolean,
        "org_fullname": string,
        "org_shortname": string,
        "org_telephone": string,
        "org_email": string,

        "inn": string,
        "kpp": string,
        "isSNSP": boolean,
        "isToken": boolean
    }
    const Org: IOrg = {
        "resident": false,
        "individual": false,
        "org_fullname": "",
        "org_shortname": "",
        "org_telephone": "",
        "org_email": "",

        "inn": "",
        "kpp": "",
        "isSNSP": false,
        "isToken": false
    }

    const [org, setOrg] = useState<IOrg>(Org)

    const handleField = (e: any) => {
        //debugger
        setOrg((prev) => ({ ...prev, [e.name]: e.value }))
        console.log(org)
        //handleValidation()
    }
    const handleCheckbox = (e: any) => {
        //debugger
        setOrg((prev) => ({ ...prev, [e.e.target.name]: e.checked }))
        console.log(org)
        //handleValidation()
    }

    return (
        <>
            <Text
                className="mb1"
                size="m"
                lineHeight="xs">
                Контактные данные организации
            </Text>

            <Layout className="mb1">
                <Layout direction="column" className="mr1">
                    <Checkbox
                        className="cb_sm"
                        id="resident"
                        name="resident"
                        label="Нерезидент"
                        onChange={handleCheckbox}
                        checked={org.resident} />

                    <Checkbox
                        className="cb_sm"
                        label="Физические лица"
                        name="individual"
                        onChange={handleCheckbox}
                        checked={org.individual} />
                </Layout>
                <Layout direction="column">
                    <Checkbox
                        className="cb_sm"
                        label="Внесен в реестр СМСП"
                        name="isSNSP"
                        onChange={handleCheckbox}
                        checked={org.isSNSP} />
                    <Layout>
                        <Checkbox
                            className="cb_sm"
                            label="Регистрация по токену"
                            name="isToken"
                            onChange={handleCheckbox}
                            checked={org.isToken} />
                        <div onMouseMove={(e) => handleMouseMove(e, msg1)} onMouseLeave={() => setPosition(undefined)}>
                            <IconInfo onClick={() => setIsModalOpen1(true)} size="s" view="ghost" className="infoPopoverIcon" />
                        </div>
                    </Layout>
                </Layout>
            </Layout>

            <div className="nolabels">
                <TextField
                    label="Полное наименование"
                    name="org_fullname"
                    type="text"
                    placeholder="Введите Полное наименование"
                    width="full"
                    required
                    value={org.org_fullname}
                    onChange={(e: any) => handleField(e)}
                />
                <TextField
                    label="Краткое наименование"
                    name="org_shortname"
                    type="text"
                    placeholder="Краткое наименование"
                    width="full"
                    required
                    value={org.org_shortname}
                    onChange={(e: any) => handleField(e)}
                />
                <TextField
                    label="ИНН"
                    name="inn"
                    type="text"
                    placeholder="Введите ИНН"
                    width="full"
                    required
                    value={org.inn}
                    onChange={(e: any) => handleField(e)}
                />
                <TextField
                    label="КПП"
                    name="kpp"
                    type="text"
                    placeholder="Введите КПП"
                    width="full"
                    required
                    value={org.kpp}
                    onChange={(e: any) => handleField(e)}
                />
                <TextField
                    label="Телефон организации"
                    name="org_telephone"
                    type="text"
                    placeholder="Введите Телефон организации"
                    width="full"
                    required
                    value={org.org_telephone}
                    onChange={(e: any) => handleField(e)}
                />
                <TextField
                    label="Эл. почта организации"
                    name="org_email"
                    type="text"
                    placeholder="Эл. почта организации"
                    width="full"
                    required
                    value={org.org_email}
                    onChange={(e: any) => handleField(e)}
                />
            </div>
            <Layout className="mt2">
                <Checkbox
                    className="cb_sm"
                    size="m"
                    label=" Согласие на обработку персональных данных"
                    onChange={(e) => handleAccept}
                    checked={accept} />
                <div onMouseMove={(e) => handleMouseMove(e, msg2)} onMouseLeave={() => setPosition(undefined)}>
                    <IconInfo onClick={() => setIsModalOpen2(true)} size="s" view="ghost" className="infoPopoverIcon" />
                </div>
            </Layout>


            <PopoverCustom position={position} text={msg} />
            {/* <ModalFZ stateChanger={setIsModalOpen} isModalOpen={isModalOpen} /> */}

            <Modal
                isOpen={isModalOpen1}
                hasOverlay
                onClickOutside={() => setIsModalOpen1(false)}
                onEsc={() => setIsModalOpen1(false)}
                style={{ maxWidth: "500px" }}
            >
                <Layout className="jcb">
                    <Text as="p" size="s" view="secondary" className="ModalTitle">
                        Что такое токен?
                    </Text>
                    <Button
                        size="l"
                        view="clear"
                        iconLeft={IconClose}
                        onClick={() => setIsModalOpen1(false)}
                    />
                </Layout>

                <div className="ModalContent">
                    <Text as="p" size="m" view="primary">
                        Токен - это уникальный идентификатор Компании-Участника
                        на Электронной торговой площадке ПАО Газпром нефть <a target="_blank" rel="noreferrer" href="https://swd1.gazprom-neft.ru/irj/portal">https://swd1.gazprom-neft.ru/irj/portal</a>
                    </Text>

                    <Text as="h2" size="l" view="primary">
                        Для чего он нужен?
                    </Text>

                    <Text as="p" size="m" view="primary">
                        Токен необходим для подтверждения принадлежности новой персонифицированной учетной записи к ранее зарегистрированной на ЭТП ПАО Газпром нефть Компании.
                    </Text>

                    <Text as="h2" size="l" view="primary">
                        Токен возможно получить:
                    </Text>
                    <Text as="p" size="m" view="primary">
                        <ol>
                            <li>При первичной регистрации Компании - токен направляется на email адрес Компании, указанный на форме регистрациии.</li>
                            <li>Через обращение в службу технической поддержки <b>helpdesk@gazprom-neft.ru</b> для повторной генерации при наличии учетной записи Компании на ЭТП ПАО Газпром нефть <a target="_blank" rel="noreferrer" href="https://swd1.gazprom-neft.ru/irj/portal">https://swd1.gazprom-neft.ru/irj/portal</a> (с ящика организации указанной при регистрации).</li>
                            <li>Путем генерации на вкладке Контактная информации в личном кабинете на ЭТП ПАО Газпром нефть. Данная опция возможна при наличии учетной записи Компании (учетные записи вида CM*).</li>
                        </ol>
                    </Text>
                </div>
                {/* <div className="ModalFooter">
                    <Button
                        size="s"
                        view="primary"
                        label="Закрыть"
                        width="default"
                        onClick={() => setIsModalOpen1(false)}
                    />
                </div> */}
            </Modal>

            <Modal
                isOpen={isModalOpen2}
                hasOverlay
                onClickOutside={() => setIsModalOpen2(false)}
                onEsc={() => setIsModalOpen2(false)}
            >
                <Layout className="jcb">
                    <Text as="p" size="s" view="secondary" className="ModalTitle">
                    ФедеральныЙ Закон РФ от 27.07.2006г. № 152-ФЗ «О персональных данных» 
                    </Text>
                    <Button
                        size="l"
                        view="clear"
                        iconLeft={IconClose}
                        onClick={() => setIsModalOpen2(false)}
                    />
                </Layout>
                <div className="ModalContent">
                    <Text as="p" size="m" view="primary" className="ModalContent">
                        <a target="_blank" rel="noreferrer" href="http://www.kremlin.ru/acts/bank/24154">Федеральный закон от 27.07.2006 г. № 152-ФЗ</a>
                    </Text>
                    <Text as="p" size="m" view="primary" className="ModalContent">
                        1. Настоящим Федеральным законом регулируются отношения, связанные с обработкой персональных данных, осуществляемой федеральными органами государственной власти, органами государственной власти субъектов Российской Федерации, иными государственными органами (далее - государственные органы), органами местного самоуправления, иными муниципальными органами (далее - муниципальные органы), юридическими лицами и физическими лицами с использованием средств автоматизации, в том числе в информационно-телекоммуникационных сетях, или без использования таких средств, если обработка персональных данных без использования таких средств соответствует характеру действий (операций), совершаемых с персональными данными с использованием средств автоматизации, то есть позволяет осуществлять в соответствии с заданным алгоритмом поиск персональных данных, зафиксированных на материальном носителе и содержащихся в картотеках или иных систематизированных собраниях персональных данных, и (или) доступ к таким персональным данным. (В редакции Федерального закона от 25.07.2011 № 261-ФЗ)
                    </Text>
                </div>
                {/* <div className="ModalFooter">
                    <Button
                        size="m"
                        view="primary"
                        label="Закрыть"
                        width="default"
                        onClick={() => setIsModalOpen2(false)}
                    />
                </div> */}
            </Modal>

        </>
    );
};

export default Step2;