import React, { FC, useState } from "react";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField } from "@consta/uikit/TextField";
import { useNavigate } from 'react-router-dom'

const GuidEnter: FC = () => {

    const [guid, setGuid] = useState<string | null>("0050569CDC861EED87DD0FCCDBEA808C");

    const navigate = useNavigate()
    const onSubmit = () => {
        navigate('/?guid=' + guid)
    }

    return (
        <>
            <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
                <GridItem>
                    <Card
                        verticalSpace="5xl"
                        horizontalSpace="xs"
                        form="round"
                        shadow={false}
                        className='loginform'>

                        <Text
                            className="tac mb1 jcc"
                            size="m"
                            lineHeight="xs">
                            Введите GUID для загрузки данных
                        </Text>

                        <TextField
                            name="email"
                            type="text"
                            placeholder="Введите email"
                            width="full"
                            onChange={({ e }: any) => { setGuid(e.target.value) }}
                            value={guid}
                        />
                        <Button
                            onClick={onSubmit}
                            label="Отправить"
                            size="m"
                            width="full"
                            className="mt1 mb2" />
                    </Card>

                </GridItem>
            </Grid>
        </>
    );
};

export default GuidEnter;

