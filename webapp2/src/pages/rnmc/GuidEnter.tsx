import React, { FC, useState } from "react";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField } from "@consta/uikit/TextField";
import { useNavigate } from 'react-router-dom'

const GuidEnter: FC = () => {

    const [link, setGuid] = useState<string | null>("0050569CDC861EDD8EE3805C575DA0E2")   //("0050569CDC861EED87DD0FCCDBEA808C");

    const navigate = useNavigate()
    const onSubmit = () => {
        navigate('?samp=' + link)
    }

    return (
        <>
            <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
                <GridItem>
                    <Card
                        verticalSpace="3xl"
                        horizontalSpace="2xl"
                        form="round"
                        className='loginform'
                        style={{ width: '430px', maxWidth: '430px' }}
                        >

                        <Text
                            className="tac mb1 jcc"
                            size="m"
                            lineHeight="xs">
                            Введите link_id для загрузки данных
                        </Text>

                        <TextField
                            name="email"
                            type="text"
                            width="full"
                            onChange={({ e }: any) => { setGuid(e.target.value) }}
                            value={link}
                        />
                        <Button
                            onClick={onSubmit}
                            label="Отправить"
                            size="m"
                            width="full"
                            className="mt1" />
                    </Card>

                </GridItem>
            </Grid>
        </>
    );
};

export default GuidEnter;

