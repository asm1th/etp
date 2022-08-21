import React, { FC } from "react";
import LoginFormCode from "../components/LoginFormCode";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { cnMixSpace } from '@consta/uikit/MixSpace';


const LoginCode: FC = () => {
    return (
        <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
            <GridItem>
                <Card verticalSpace="4xl" horizontalSpace="4xl" form="round" shadow={false}
                    className={`loginform ${cnMixSpace({ mT: '3xl', })}`}>
                    <LoginFormCode/>
                </Card>
            </GridItem>
        </Grid>
    );
};

export default LoginCode;

