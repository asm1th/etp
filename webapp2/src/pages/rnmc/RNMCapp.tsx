import React, { FC, useState } from "react";
import '../../App.css';
import './rnmc.css';
import { Button } from "@consta/uikit/Button";
import TopBar from "../../components/fragments/TopBar";
import BarKP from "../../components/fragments/BarKP";
import { useProtectedMutation } from "../../services/authService";
import { MainService, useFetchSampMutation } from "../../services/MainService";
import Etaps from "../../components/fragments/Etaps";
import EtapsItog from "../../components/fragments/EtapsItog";
import EtapFooterButtons from "../../components/fragments/EtapFooterButtons";

const RNMCapp: FC = () => {
    //const [attemptAccess, { data, error, isLoading }] = useProtectedMutation();
    const [kp_sample_guid, setKp_sample_guid] = useState('0050569CDC861EED87DD0FCCDBEA808C');
    const [attemptAccess, { data: samp, error, isLoading }] = useFetchSampMutation()

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
            <Button label="Запрос /users с токеном" onClick={() => attemptAccess(kp_sample_guid)} loading={isLoading}/>
            <div>
                Данные /users (attemptAccess):
                {samp ? (
                    <>
                        Data:
                        <pre>{JSON.stringify(samp, null, 2)}</pre>
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

export default RNMCapp;