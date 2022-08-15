import { Button } from "@consta/uikit/Button";
import React, { FC } from "react";
import Navbar from "../components/Navbar";
import PostContainer from "../components/PostContainer";
import TopBar from "../components/fragments/TopBar";
import BarKP from "../components/fragments/BarKP";

import { useProtectedMutation } from "../services/authService";


const Dash: FC = () => {
    const [attemptAccess, { data, error, isLoading }] = useProtectedMutation(); //
    return (
        <div>
            <TopBar />
            <BarKP />

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
        </div>
    );
};

export default Dash;