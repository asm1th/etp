import React, { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconDocExport } from '@consta/uikit/IconDocExport';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconAttach } from '@consta/uikit/IconAttach';
import { IconSendMessage } from '@consta/uikit/IconSendMessage';
import { FileField, FileFieldProps } from '@consta/uikit/FileField';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../util/ComponentToPrint';
import { useAppSelector } from "../../hooks/redux";
import { sampSlice } from "../../store/reducers/samp/sampSlice";
import { useDispatch } from "react-redux";

import { Attachment } from '@consta/uikit/Attachment';
import { IconClose } from '@consta/uikit/IconClose';


const SampFooterButtons: FC = () => {
    const dispatch = useDispatch()
    const { kp_send_date, stags } = useAppSelector(state => state.sampReducer)

    const attach = (e: any) => {
        console.log(e)
        alert("File")
    }

    //print
    let componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    let navigate = useNavigate();
    const toKP = () => {
        navigate('/kp');
        validateKP()
    }
    const toHome = () => navigate('/');

    const validateKP = () => {
        stags.forEach(stag => {
            stag.units.forEach(unit => {
                unit.usrps.forEach(usrp => {
                    if (usrp.prices_user === "" || parseInt(usrp.prices_user) === 0) {
                        let UnitFinder = { kp_stage_guid: unit.kp_stage_guid, kp_unit_guid: unit.kp_unit_guid, link_id: usrp.link_id }
                        dispatch(sampSlice.actions.isValid({ UnitFinder: UnitFinder, value: false }))
                    }
                })
            })
        })
    }

    const segments = new URL(window.location.href).pathname.split('/');
    const last = segments.pop() || segments.pop(); // Handle potential trailing slash
    console.log(last);


    return (
        <>
            <Layout flex={1} className="EtapFooterButtons aic jce">

                {kp_send_date ? (
                    <Text as="div" className="mr2 label">
                        КП отправлено {kp_send_date}
                    </Text>
                ) : null}


                {last === 'kp' ? (
                    <Button
                        onClick={toHome}
                        label="Редактировать КП"
                        size="m"
                        iconLeft={IconEdit}
                    />
                ) : (
                    <Button
                        onClick={toKP}
                        label="Сформировать КП"
                        size="m"
                        iconLeft={IconDocFilled}
                    />
                )}

                <div
                    style={{ display: "none" }}>
                    <ComponentToPrint ref={componentRef} />
                </div>
                <Button
                    label="Версия для печати"
                    size="m"
                    iconLeft={IconDocExport}
                    onClick={handlePrint}
                    view="secondary" />
                <FileField
                    id="FileFieldWithIcon">
                    {(props) =>
                        <Button {...props}
                            label="Прикрепить подписанное КП"
                            size="m"
                            iconLeft={IconAttach}
                            view="secondary" />
                    }
                </FileField>
                {/* <Attachment
                    style={{width: "250px"}}
                    className="attach"
                    fileName="Имя файла"
                    fileExtension="pdf"
                    loading
                    loadingText="Загружено на 51%"
                    buttonIcon={IconClose}
                    buttonTitle="Отменить"
                    onClick={() => console.log('onClick')}
                    onButtonClick={(e) => {
                        e.stopPropagation();
                        console.log('onButtonClick');
                    }}
                /> */}
                <Button
                    label="Отправить КП"
                    size="m"
                    iconLeft={IconSendMessage}
                    disabled
                    view="secondary" />
            </Layout>

        </>
    );
};

export default SampFooterButtons;