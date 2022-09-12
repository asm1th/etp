
import React, { FC } from "react";
import RNMCapp from "../../pages/rnmc/RNMCapp"; 
import '../etp/Etp.css';

const RNMCappEtp: FC = () => {
    document.body.classList.add('etpStyle');

    return (
        <div className="etp">  
            <RNMCapp />
        </div>
    );
};

export default RNMCappEtp;