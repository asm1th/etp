import React, { FC } from "react";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { ResponsesExit } from '@consta/uikit/ResponsesExit';
import { Button } from "@consta/uikit/Button";
import { Link } from 'react-router-dom';


const Logout: FC = () => {
    return (
        <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
            <GridItem>
                <div style={{ height: '500px', width: '500px' }}>
                    <ResponsesExit />
                    {/* <Button 
                            disabled={true}
                            size="s" 
                            label="Скачать ТЗ" 
                            view="secondary" 
                            iconLeft={IconDownload} /> */}
                    <Link to="/login">Вход</Link>
                </div>
            </GridItem>
        </Grid>
    );
};

export default Logout;
