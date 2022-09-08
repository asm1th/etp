import React, { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Checkbox } from '@consta/uikit/Checkbox';
import { IconInfo } from '@consta/uikit/IconInfo';
import PopoverCustom from '../util/PopoverCustom';

import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { regSlice } from '../../store/reducers/reg/regSlice'

const Step2: FC = () => {


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

    const dispatch = useAppDispatch()
    const { regData, formErrors, isAccept, isError} = useAppSelector(state => state.regReducer)

    const handleField = (e: any) => dispatch(regSlice.actions.setRegDataProp({ prop: e.name, value: e.value }))
    const handleFieldINN = (e: any) => dispatch(regSlice.actions.setRegDataProp({ prop: e.name, value: e.value }))
    const handleCheckbox = (e: any) => dispatch(regSlice.actions.setRegDataBool({ prop: e.e.target.name, checked: e.checked }))
    const handleAccept = (e: any) => dispatch(regSlice.actions.setRegAccept({ checked: e.checked }))

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
                        name="isResident"
                        label="Нерезидент"
                        checked={regData.isResident}
                        onChange={(e: any) => handleCheckbox(e)}
                    />
                    <Checkbox
                        className="cb_sm"
                        label="Физические лица"
                        name="isIndividual"
                        checked={regData.isIndividual}
                        onChange={(e: any) => handleCheckbox(e)}
                    />
                </Layout>
                <Layout direction="column">
                    <Checkbox
                        className="cb_sm"
                        label="Внесен в реестр СМСП"
                        name="isSmsp"
                        checked={regData.isSmsp} 
                        onChange={(e: any) => handleCheckbox(e)}
                    />
                    <Layout>
                        <Checkbox
                            className="cb_sm"
                            label="Регистрация по токену"
                            name="isToken"
                            disabled={true}
                            checked={regData.isToken} 
                            onChange={(e: any) => handleCheckbox(e)}
                        />
                        <div onMouseMove={(e) => handleMouseMove(e, msg1)} onMouseLeave={() => setPosition(undefined)}>
                            <IconInfo onClick={() => setIsModalOpen1(true)} size="s" view="ghost" className="infoPopoverIcon" />
                        </div>
                    </Layout>
                </Layout>
            </Layout>

            <div className="nolabels">
                <TextField
                    
                    label="Полное наименование"
                    placeholder="Введите Полное наименование"
                    name="org_fullname"
                    type="text"
                    width="full"
                    required
                    value={regData.org_fullname}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.org_fullname === "" ? undefined : "alert"}
                    caption={formErrors.org_fullname}
                />
                <TextField
                    label="Краткое наименование"
                    placeholder="Краткое наименование"
                    name="org_shortname"
                    type="text"
                    className="mt1"
                    width="full"
                    required
                    value={regData.org_shortname}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.org_shortname === "" ? undefined : "alert"}
                    caption={formErrors.org_shortname}
                />
                <TextField
                    label="ИНН"
                    placeholder="Введите ИНН"
                    name="inn"
                    type="text"
                    width="full"
                    className="mt1"
                    required
                    maxLength={12}
                    value={regData.inn}
                    onChange={(e: any) => handleFieldINN(e)}
                    status={formErrors.inn === "" ? undefined : "alert"}
                    caption={formErrors.inn}
                />
                <TextField
                    label="КПП"
                    placeholder="Введите КПП"
                    name="kpp"
                    type="text"
                    className="mt1"
                    width="full"
                    required
                    maxLength={9}
                    value={regData.kpp}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.kpp === "" ? undefined : "alert"}
                    caption={formErrors.kpp}
                />
                <TextField
                    label="Телефон организации"
                    placeholder="Введите Телефон организации"
                    name="org_telephone"
                    type="text"
                    className="mt1"
                    width="full"
                    required
                    maxLength={20}
                    value={regData.org_telephone}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.org_telephone === "" ? undefined : "alert"}
                    caption={formErrors.org_telephone}
                />
                <TextField
                    label="Эл. почта организации"
                    placeholder="Эл. почта организации"
                    name="org_email"
                    type="text"
                    width="full"
                    className="mt1"
                    required
                    value={regData.org_email}
                    onChange={(e: any) => handleField(e)}
                    status={formErrors.org_email === "" ? undefined : "alert"}
                    caption={formErrors.org_email}
                />
            </div>
            <Layout className="mt2">
                <Checkbox
                    className="cb_sm"
                    size="m"
                    label="Согласие на обработку персональных данных"
                    onChange={(e) => handleAccept(e)}
                    checked={isAccept} />
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