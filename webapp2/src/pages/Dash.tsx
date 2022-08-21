import { Button } from "@consta/uikit/Button";
import React, { FC } from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/fragments/TopBar";
import BarKP from "../components/fragments/BarKP";
import { useProtectedMutation } from "../services/authService";
import Etaps from "../components/fragments/Etaps";
import EtapsItog from "../components/fragments/EtapsItog";
import EtapFooterButtons from "../components/fragments/EtapFooterButtons";

const Dash: FC = () => {
    const [attemptAccess, { data, error, isLoading }] = useProtectedMutation();
    
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
            <Button label="Запрос /users с токеном" onClick={() => attemptAccess()} loading={isLoading}/>
            <div>
                Данные /users (attemptAccess):
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