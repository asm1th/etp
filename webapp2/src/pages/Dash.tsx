import { Button } from "@consta/uikit/Button";
import React, { FC } from "react";
import Navbar from "../components/Navbar";
import PostContainer from "../components/PostContainer";
import TopBar from "../components/fragments/TopBar";
import BarKP from "../components/fragments/BarKP";
import { useProtectedMutation } from "../services/authService";
import Etaps from "../components/fragments/Etaps";
import EtapsItog from "../components/fragments/EtapsItog";
import EtapFooterButtons from "../components/fragments/EtapFooterButtons";

import {setupStore} from '../store/store'

const Dash: FC = () => {
    const [attemptAccess, { data, error, isLoading }] = useProtectedMutation(); //
    
    const store = setupStore();
    console.log('Initial state: ', store.getState())

    store.subscribe(() =>
        console.log('State after dispatch: ', store.getState())
    )
    
    return (
        <>
            <TopBar />
            <BarKP />
            <Etaps />
            <EtapsItog />
            <EtapFooterButtons />

            {/* <Navbar /> */}
            {/* <PostContainer /> */}
            
            
            {/* test protected request */}
            <Button label="attemptAccess" onClick={() => attemptAccess()} loading={isLoading}/>
            <div>
                Данные attemptAccess:
                {data ? (
                    <>
                        Data:
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </>
                ) : error ? (
                    <>
                        Error: <pre>{JSON.stringify(error, null, 2)}</pre>
                    </>
                ) : null}
            </div>
        </>
    );
};

export default Dash;