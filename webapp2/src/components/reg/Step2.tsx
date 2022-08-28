import React, { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Checkbox } from '@consta/uikit/Checkbox';

const Step2: FC = () => {
    const [accept, setAccept] = useState<boolean>(false);
    const handleAccept = (e: boolean) => setAccept(!accept);

    // {
    //     "lastname": "string",
    //     "firstname": "string",
    //     "patronymic": "string",
    //     "email": "string",
        
    //     "resident": true,
    //     "individual": true,
        
    //     "org_fullname": "string",
    //     "org_shortname": "string",
    //     "org_telephone": "string",
    //     "org_email": "string",

    //     "password": "string"
    //   }

    return (
        <>
            <Text
                className="mb1"
                size="m"
                lineHeight="xs">
                Контактные данные организации
            </Text>

            <Layout className="mb2">
                <Layout direction="column" className="mr1">
                    <Checkbox
                        className="cb_sm"
                        label="Нерезидент"
                        onChange={(e) => handleAccept}
                        checked={accept} />

                    <Checkbox
                        className="cb_sm"
                        label="Физические лица"
                        onChange={(e) => handleAccept}
                        checked={accept} />
                </Layout>
                <Layout direction="column">
                    <Checkbox
                        className="cb_sm"
                        label="Внесен в реестр СМСП"
                        onChange={(e) => handleAccept}
                        checked={accept} />

                    <Checkbox
                        className="cb_sm"
                        label="Регистрация по токену"
                        onChange={(e) => handleAccept}
                        checked={accept} />

                </Layout>
            </Layout>

            <div className="nolabels">

                <TextField
                    label="Полное наименование"
                    name="secondname"
                    type="text"
                    placeholder="Введите Полное наименование"
                    width="full"
                    required
                />
                <TextField
                    label="Краткое наименование"
                    name="secondname"
                    type="text"
                    placeholder="Краткое наименование"
                    width="full"
                    required
                />
                <TextField
                    label="ИНН"
                    name="secondname"
                    type="text"
                    placeholder="Введите ИНН"
                    width="full"
                    required
                />
                <TextField
                    label="КПП"
                    name="secondname"
                    type="text"
                    placeholder="Введите КПП"
                    width="full"
                    required
                />
                <TextField
                    label="Телефон организации"
                    name="secondname"
                    type="text"
                    placeholder="Введите Телефон организации"
                    width="full"
                    required
                />
                <TextField
                    label="Эл. почта организации"
                    name="secondname"
                    type="text"
                    placeholder="Эл. почта организации"
                    width="full"
                    required
                />
            </div>

            <Checkbox
                className="mt2 cb_sm"
                size="m"
                label=" Согласие на обработку персональных данных"
                onChange={(e) => handleAccept}
                checked={accept} />
        </>
    );
};

export default Step2;