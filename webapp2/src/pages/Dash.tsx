import { Button } from "@consta/uikit/Button";
import React, { FC } from "react";
import Navbar from "../components/Navbar";
import PostContainer from "../components/PostContainer";

import { useProtectedMutation } from "../services/auth"; //

const Dash: FC = () => {
    const [attemptAccess, { data, error, isLoading }] = useProtectedMutation(); //
    return (
        <div>
            <Navbar />
            <PostContainer />


            {/* test protected request */}
            <Button label="attemptAccess" onClick={() => attemptAccess()} />
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