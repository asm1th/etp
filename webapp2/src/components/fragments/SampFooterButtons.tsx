import React, { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconDocExport } from '@consta/uikit/IconDocExport';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconAttach } from '@consta/uikit/IconAttach';
import { IconSendMessage } from '@consta/uikit/IconSendMessage';
import { FileField } from '@consta/uikit/FileField';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../util/ComponentToPrint';
import { useAppSelector } from "../../hooks/redux";
import { sampSlice } from "../../store/reducers/samp/sampSlice";
import { useDispatch } from "react-redux";

import { Attachment } from '@consta/uikit/Attachment';
import { IconClose } from '@consta/uikit/IconClose';
import { IFileKP } from "../../models/ISamp";
import { useUpdateFileMutation } from "../../services/SampService";


const SampFooterButtons: FC = () => {
    const dispatch = useDispatch()
    const { kp_sample_guid, kp_send_date, stags, link } = useAppSelector(state => state.sampReducer)

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

    const toHome = () => navigate('/?samp=' + kp_sample_guid)

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
    
    // type fff = {
    //     lastModified: number
    //     lastModifiedDate: Date
    //     name: string
    //     size: number
    //     type: string
    //     webkitRelativePath: string
    // }

    const emptyFile: IFileKP = {
        "file_guid": "",
        "file_name": "",
        "file_type": "",
        "file_size": 0,
        "file_mime_type": "",
        "file_body": "",
        "description": "",
    }

    const [file, setFile] = useState<IFileKP>(emptyFile)

    const handleChange = async (e: any) => {
        let fff = e.target.files[0]
        const base64: string = await convertBase64(fff) as string
        let File: IFileKP = {
            "file_guid": link,//"bf50de7e74724ff5a6759663f9073505",
            "file_name": fff.name,
            "file_type": fff.name.substr(fff.name.lastIndexOf('.') + 1), //"txt",
            "file_size": fff.size, //"5294",
            "file_mime_type": fff.type, //"text/plain",
            "file_body": base64,
            "description": "подписанный файл КП"
        }
        setFile(File)
        //console.log(file)
    }

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const [updateFile, { isLoading: isUpdatingFile }] = useUpdateFileMutation()

    const handlSendFile = () => {
        updateFile(file)
    }


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
                    id="FileFieldWithIcon"
                    onChange={handleChange} >
                    {(props) =>
                        <Button {...props}
                            label="Прикрепить подписанное КП"
                            size="m"
                            iconLeft={IconAttach}
                            view="secondary" />
                    }
                </FileField>


                <Button
                    label="Отправить КП"
                    size="m"
                    iconLeft={IconSendMessage}
                    disabled={file.file_name === ""}
                    view="secondary"
                    onClick={handlSendFile}
                    loading={isUpdatingFile}
                />

                {file.file_name !== "" ? (
                    <Attachment
                        style={{ width: "250px" }}
                        className="attach"
                        fileName={file.file_name}
                        fileExtension={file.file_type}
                        //loading
                        //loadingText="Загружено на 51%"
                        // fileDescription={file.file_size.toString()}
                        buttonIcon={IconClose}
                        buttonTitle="Отменить"
                        onClick={() => console.log('onClick')}
                        onButtonClick={(e) => {
                            e.stopPropagation();
                            setFile(emptyFile)
                        }}
                    />
                ) : null}
            </Layout>

        </>
    );
};

export default SampFooterButtons;