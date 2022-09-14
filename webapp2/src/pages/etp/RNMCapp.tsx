
import React, { FC } from "react";
import DashHeader from "../../components/dash/DashHeader";
import RNMCapp from "../../pages/rnmc/RNMCapp"; 
import './Etp.css';

const RNMCappEtp: FC = () => {
    document.body.classList.add('etpStyle');

    return (
        <div className="RNMCappETP">
            <DashHeader/>
            <RNMCapp />
        </div>
    );
};

export default RNMCappEtp;