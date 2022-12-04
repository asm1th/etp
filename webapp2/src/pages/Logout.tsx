import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { ResponsesExit } from '@consta/uikit/ResponsesExit';
import { Button } from "@consta/uikit/Button";
import { Layout } from "@consta/uikit/Layout";


const Logout: FC = () => {
    let navigate = useNavigate();
    const toLogin = () => navigate('/login');

    return (
        <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
            <GridItem>
                <div style={{ height: '500px', width: '500px' }}>
                    <ResponsesExit />
                    <Layout className="mt2 jcc">
                        <Button
                            onClick={toLogin}
                            label="Вход"
                            size="m"
                        />
                    </Layout>
                </div>
            </GridItem>
        </Grid>
    );
};

export default Logout;
