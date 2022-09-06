import React, { FC, useRef } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from "@consta/uikit/Button";
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconDocExport } from '@consta/uikit/IconDocExport';
import { IconAttach } from '@consta/uikit/IconAttach';
import { IconSendMessage } from '@consta/uikit/IconSendMessage';
import { FileField, FileFieldProps } from '@consta/uikit/FileField';

import { Attachment } from '@consta/uikit/Attachment';
import { IconClose } from '@consta/uikit/IconClose';

import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../util/ComponentToPrint';

const EtapFooterButtons: FC = () => {

    const attach = (e: any) => {
        console.log(e)
        alert("File")
    }

    //print
    let componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            
            <Layout flex={1} className="EtapFooterButtons aic jce">
                <Button label="Сформировать КП" size="s" iconLeft={IconDocFilled} disabled />
                <div style={{ display: "none" }}>
                    <ComponentToPrint ref={componentRef} />
                </div>
                <Button label="Версия для печати" size="s" iconLeft={IconDocExport} onClick={handlePrint} view="secondary" />
                <FileField id="FileFieldWithIcon">{(props) => <Button {...props} label="Прикрепить подписанное КП" size="s" iconLeft={IconAttach} view="secondary" />}</FileField>
                <Attachment
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
                />
                <Button label="Отправить КП" size="s" iconLeft={IconSendMessage} disabled view="secondary" />
            </Layout>

        </>
    );
};

export default EtapFooterButtons;