import React, { FC } from "react";
import Navbar from "../components/Navbar";
import PostContainer from "../components/PostContainer";

const Dash: FC = () => {

    return (
        <div>
            <Navbar />
            <PostContainer />
        </div>
    );
};

export default Dash;