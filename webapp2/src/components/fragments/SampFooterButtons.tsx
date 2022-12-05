import React, { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from '@consta/uikit/Layout';
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
import { format } from "date-fns";
import { Modal } from "@consta/uikit/Modal";
import { DragNDropField } from '@consta/uikit/DragNDropField';
import { getFile, binaryToString } from "../../helpers/fileHelper";
import packageJson from "../../../package.json";



const emptyFile: IFileKP = {
    "file_mime_type": "",
    "file_body": "",
    "file_size": "",
    "description": "",
    "file_guid": "",
    "file_name": "",
    "file_type": "",
    "file_docid": ""
}

const SampFooterButtons: FC = () => {
    const dispatch = useDispatch()
    const { stags, link, files, links } = useAppSelector(state => state.sampReducer)

    //const filesKP = files && files.length > 0 && files[files.findIndex(file => file.description === "подписанный файл КП")]
    const filesKP = files.filter(file => file.description === "подписанный файл КП");
    const lastFile = filesKP && filesKP.length > 0 ? filesKP[filesKP.length - 1] : null

    //print
    let componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    let navigate = useNavigate();
    const toKP = () => {
        if (validateKP().isValid) {
            navigate('/kp_view?samp=' + link);
        } else {
            setErrorStage(validateKP().msg.join(', '))
            setIsModalOpenError(true)
            dispatch(sampSlice.actions.setValidateOn({ value: true }))
        }
    }
    const [errorStage, setErrorStage] = useState<string>("")
    const [isModalOpenError, setIsModalOpenError] = useState(false);

    const toHome = () => navigate('/?samp=' + link)

    const validateKP = () => {
        let isValid = true
        let SatgeNum: any[] = []

        if (links.kp_offer_expire_date == "" || links.kp_offer_expire_date == null || links.kp_offer_expire_date == undefined) {
            isValid = false
        }

        stags.forEach(stag => {
            stag.units.forEach(unit => {
                unit.usrps.forEach(usrp => {
                    if (
                        usrp.prices_user === "" || 
                        parseFloat(usrp.prices_user) === 0 || 
                        usrp.nsu_menge === "" || 
                        parseFloat(usrp.nsu_menge) === 0 ||
                        (usrp.vat_rate === "NN" && usrp.nds_comm === "")
                    ) {
                        let UnitFinder = { kp_stage_guid: unit.kp_stage_guid, kp_unit_guid: unit.kp_unit_guid, link_id: usrp.link_id }
                        dispatch(sampSlice.actions.isValid({ UnitFinder: UnitFinder, value: false }))
                        isValid = false

                        SatgeNum.push(stag.opr_usl_stage_num)
                        console.log("Ошибка в этапе: "+ SatgeNum.join(', ') +". Не заполнена расценка: "+ JSON.stringify(usrp))
                    }
                })
            })
        })
        return {isValid: isValid, msg: SatgeNum}
    }

    const isKPView = window.location.href.match('/kp_view')
    
    // Files
    const [updateFile, { isLoading: isUpdatingFile, isSuccess: isUpdatedFile }] = useUpdateFileMutation()
    const [uploadFiles, setUploadFiles] = useState<File[]>([])

    const getUploadedFile = async (file: File) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            let b64 = window.btoa(binaryToString(e.target && e.target.result))
            let File: IFileKP = {
                "file_guid": link,//"bf50de7e74724ff5a6759663f9073505",
                "file_docid": "",
                "file_name": file.name,
                "file_type": file.name.substring(file.name.lastIndexOf('.') + 1), //"txt",
                "file_size": file.size.toString(), //"5294",
                "file_mime_type": file.type, //"text/plain",
                "file_body": b64,
                "description": "подписанный файл КП"
            }

            updateFile(File).then(
                data => {
                    setUploadFiles([])
                }
            )
        };

        reader.onerror = function (e) {
            alert('Ошибка чтения файла')
        };
        reader.readAsArrayBuffer(file);
    }

    const setFilesData = (files: File[]) => {
        setUploadFiles(files)
    }

    const handlSendFile = () => {
        uploadFiles.forEach(function (file: File) {
            getUploadedFile(file)
        })
    }

    const onDownload = (file: IFileKP | null) => {
        if (file && file.file_name) {
            getFile(link, file)
        }
    }

    //.Files

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleUpload = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <Layout className="AttachmentDiv">
                {uploadFiles.length > 0 ?
                    uploadFiles.map((file) => (
                        <Attachment
                            key={file.name}
                            style={{ width: "380px" }}
                            className="attach"
                            fileName={file.name}
                            //fileExtension={file.type}
                            fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
                            //loading
                            //loadingText="Загружено на 51%"
                            fileDescription={(file.size && (file.size / 1024).toFixed(2)).toString() + " Kb"}
                            buttonIcon={IconClose}
                            buttonTitle="Отменить"
                            //onClick={downloadNotLoaded}
                            onButtonClick={(e) => {
                                e.stopPropagation();
                                setUploadFiles([])
                            }}
                        />
                    )) : lastFile ? (
                        <Attachment
                            style={{ width: "380px" }}
                            className="attach"
                            fileName={lastFile.file_name}
                            fileExtension={lastFile.file_type}
                            //loading
                            //loadingText="Загружено на 51%"
                            fileDescription={lastFile.file_size && (parseInt(lastFile.file_size) / 1024).toFixed(2) + "Kb"}
                            //buttonIcon={IconClose}
                            //buttonTitle="Отменить"
                            onClick={() => onDownload(lastFile)}
                            onButtonClick={(e) => {
                                e.stopPropagation();
                                setUploadFiles([])
                            }}
                        />
                    ) : null}
            </Layout>
            <Layout className="EtapFooterButtons aic jce">

                {/* {kp_send_date ? (
                    <Text as="div" className="mr1 label kp_send_date">
                        <span>КП отправлено {kp_send_date && format(new Date(kp_send_date), 'dd.MM.yyyy')}</span>
                    </Text>
                ) : null} */}

                <Text as="div" className="mr1 label kp_send_date">
                    {isUpdatedFile ? (
                        <span>КП отправлено {format(new Date(), 'dd.MM.yyyy HH:mm:ss')}</span>
                    ) : null}
                </Text>

                {isKPView ? (
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

                {/* <FileField
                    id="FileFieldWithIcon"
                    onChange={handleChange} >
                    {(props) =>
                        <Button {...props}
                            label="Прикрепить подписанное КП"
                            size="m"
                            iconLeft={IconAttach}
                            view="secondary" />
                    }
                </FileField> */}

                <Button
                    label="Прикрепить подписанное КП"
                    size="m"
                    iconLeft={IconAttach}
                    view="secondary"
                    onClick={handleUpload} />

                <Button
                    label="Отправить КП"
                    size="m"
                    iconLeft={IconSendMessage}
                    disabled={uploadFiles.length == 0}
                    view={files.length == 0 ? 'secondary' : 'primary'}
                    onClick={handlSendFile}
                    loading={isUpdatingFile}
                />
            </Layout>
            
            <div style={{ position: 'fixed', zIndex: '200', right: '15px', bottom: '10px'}}>
                <Text view="ghost" size="2xs" >v {packageJson.version}</Text>
            </div>

            {/* <!-- --> */}
            <Modal
                isOpen={isModalOpen}
                hasOverlay
                onClickOutside={() => setIsModalOpen(false)}
                onEsc={() => setIsModalOpen(false)}
                style={{ maxWidth: "700px" }}
                className="UploadModal">

                <Layout className="jcb">
                    <Text as="p" size="2xl" weight="bold" className="ModalTitle">
                        Прикрепить подписанное КП
                    </Text>
                    <Button
                        size="l"
                        view="clear"
                        iconLeft={IconClose}
                        onClick={() => setIsModalOpen(false)}
                    />
                </Layout>
                <div className="ModalContent">
                    <Text as="p" size="m" view="primary">
                        Прикрепите подписанное коммерческое предложение и техническое предложение (при наличии)
                    </Text>
                    {uploadFiles.length > 0 ?

                        uploadFiles.map((file) => (
                            <Attachment
                                key={file.name}
                                className="attach mb1"
                                fileName={file.name}
                                //fileExtension={file.type}
                                fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
                                // loading
                                // loadingText="Загружено на 51%"
                                fileDescription={(file.size && (file.size / 1024).toFixed(2)).toString() + " Kb"}
                                buttonIcon={IconClose}
                                buttonTitle="Отменить"
                                //onClick={downloadNotLoaded}

                                onButtonClick={(e) => {
                                    e.stopPropagation();
                                    setUploadFiles([])
                                }}
                            />
                        )) : lastFile ? (
                            <Attachment
                                style={{ width: "380px" }}
                                className="attach mb1"
                                fileName={lastFile.file_name}
                                fileExtension={lastFile.file_type}
                                fileDescription={lastFile.file_size && (parseInt(lastFile.file_size) / 1024).toFixed(2) + "Kb"}
                                onClick={() => onDownload(lastFile)}
                                onButtonClick={(e) => {
                                    e.stopPropagation();
                                    setUploadFiles([])
                                }}
                            />
                        ) : null}

                    <DragNDropField
                        onDropFiles={(files) => setFilesData(files)}
                        //onDropFiles={setUploadFiles}
                        //onDropFiles={(files) => console.log(files)}
                        multiple={false}
                        accept={['.pdf', 'png', 'jpeg', 'jpg']}
                        maxSize={30 * 1024 * 1024}>
                        {({ openFileDialog }) => (
                            <>
                                <Text size="s">
                                    Перетащите файлы или
                                </Text>

                                <Button
                                    className="mt1"
                                    onClick={openFileDialog}
                                    label="загрузите"
                                    size="s"
                                    view="ghost"
                                    iconRight={IconAttach}
                                />
                                <br />
                                <Text view="secondary" size="s">
                                    Поддерживаемые форматы: png, jpeg, jpg, pdf
                                </Text>
                            </>
                        )}
                    </DragNDropField>

                </div>
                <div className="ModalFooter">
                    <Button
                        className="mr1"
                        size="s"
                        view="secondary"
                        label="Отмена"
                        width="default"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <Button
                        size="s"
                        view="primary"
                        label="Готово"
                        width="default"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>
            </Modal>

            <Modal
                isOpen={isModalOpenError}
                onClickOutside={() => setIsModalOpenError(false)}
                onEsc={() => setIsModalOpenError(false)}
                hasOverlay={false}
                className="alertModal"
            >
                <Text as="p" size="s" view="secondary">
                    Не заполнены данные
                </Text>
                <Text as="p" size="m" view="primary">
                    Необходимо заполнить все обязательные поля подсвеченные красным в Этапе {errorStage}
                </Text>
                <div className="modalAction">
                    <Button
                        size="m"
                        view="primary"
                        label="Закрыть"
                        width="default"
                        onClick={() => setIsModalOpenError(false)}
                    />
                </div>
            </Modal>
        </>
    );
};

export default SampFooterButtons;