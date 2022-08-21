import React, { FC, useState } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from "@consta/uikit/Button";
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconDocExport } from '@consta/uikit/IconDocExport';
import { IconAttach } from '@consta/uikit/IconAttach';
import { IconSendMessage } from '@consta/uikit/IconSendMessage';

const EtapFooterButtons: FC = () => {

    return (
        <>
            <Layout flex={1} className="EtapFooterButtons aic jce">
                <Button label="Сформировать КП" size="s" iconLeft={IconDocFilled} disabled/>
                <Button label="Версия для печати" size="s" iconLeft={IconDocExport} disabled view="secondary"/>
                <Button label="Прикрепить подписанное КП" size="s" iconLeft={IconAttach} disabled view="secondary"/>
                <Button label="Отправить КП" size="s" iconLeft={IconSendMessage} disabled view="secondary"/>
            </Layout>
            
        </>
    );
};

export default EtapFooterButtons;