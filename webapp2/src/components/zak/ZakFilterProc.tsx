import React from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconTop } from '@consta/uikit/IconTop';
import { IconDown } from '@consta/uikit/IconDown';
import { useAppSelector } from "../../hooks/redux";
import './ZakFilterProc.css'
import { TextField } from "@consta/uikit/TextField";


const ZakFilterProc = () => {

    
    return (
        <>
            <Layout>


                <Text className="dashItemLabel">Фильтр</Text>
                <TextField></TextField>


            </Layout>

        </>
    );
};

export default ZakFilterProc;