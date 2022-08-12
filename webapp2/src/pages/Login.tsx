import React, { FC } from "react";
import LoginForm from "../components/LoginForm";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { cnMixSpace } from '@consta/uikit/MixSpace';


const Login: FC = () => {
    return (
        <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
            <GridItem>
                <Card verticalSpace="2xl" horizontalSpace="2xl" form="round"
                    className={`loginform ${cnMixSpace({ mT: '3xl', })}`}>
                    <LoginForm/>
                </Card>
            </GridItem>
        </Grid>
    );
};

export default Login;

